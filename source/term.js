//======//
// Term //
//======//
{
	
	const Term = {}
	
	const STYLE_SUCCESS = `font-weight: bold; color: rgb(0, 128, 255)`
	const STYLE_FAILURE = `font-weight: bold; color: rgb(255, 70, 70)`
	const STYLE_DEPTH = `font-weight: bold;`
	const log = (result, depth = 10) => {
		
		if (depth < 0) {
			console.log("%cMaximum depth reached", STYLE_DEPTH)
			return
		}
	
		const style = result.success? STYLE_SUCCESS : STYLE_FAILURE
		
		if (result.length === 0) {
			console.log("%c" + result.error, style)
			return
		}
		
		console.groupCollapsed("%c" + result.error, style)
		for (const child of result) {
			log(child, depth - 1)
		}
		console.groupEnd()
		
	}
	
	const logValue = (value) => {
		for (const v of value) {
			if (typeof v === "string") console.log(v)
			else log(v)
		}
	}
	
	Term.result = ({success, source, output = source, tail, term, error = "", children = []} = {}) => {
		const self = (input, args = {exceptions: []}) => {			
			const result = [...children]
			result.success = success
			result.output = output
			result.source = source
			result.tail = tail === undefined? input : tail
			result.term = term
			result.error = error
			
			result.input = input
			result.args = cloneArgs(args)
			result.toString = function() { return this.output }
			result.log = (depth) => {
				log(result, depth)
				return result
			}
			return result
		}
		return self
	}
	
	Term.succeed = (properties = {}) => Term.result({...properties, success: true})
	Term.fail    = (properties = {}) => Term.result({...properties, success: false})
	
	Term.string = (string) => {
		const term = (input, args = {exceptions: []}) => {
			const snippet = input.slice(0, term.string.length)
			const success = snippet === term.string
			if (!success) return Term.fail({
				term,
				error: `Expected '${term.string}' but found '${snippet}'`,
			})(input, args)
			return Term.succeed({
				source: term.string,
				tail: input.slice(term.string.length),
				term,
				children: [],
				error: `Found '${term.string}'`
			})(input, args)
		}
		term.string = string
		return term
	}
	
	Term.regExp = (regExp) => {
		const term = (input, args = {exceptions: []}) => {
			const finiteRegExp = new RegExp("^" + term.regExp.source + "$")
			let i = 0
			while (i <= input.length) {
				const snippet = input.slice(0, i)
				const success = finiteRegExp.test(snippet)
				if (success) return Term.succeed({
					source: snippet,
					tail: input.slice(snippet.length),
					term,
					children: [],
					error: `Found /${term.regExp.source}/ with '${snippet}'`,
				})(input, args)
				i++
			}
			return Term.fail({
				term,
				error: `Expected /${term.regExp.source}/ but found: '${input}'`,
			})(input, args)
		}
		term.regExp = regExp
		return term
	}
	
	const cloneArgs = (args = {exceptions: []}) => {
		const clone = {...args}
		if (args.exceptions !== undefined) clone.exceptions = [...args.exceptions]
		return clone
	}
	
	Term.list = (terms) => {
		const self = (input, args = {exceptions: []}) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (state.i < self.terms.length) {
				const clonedArgs = cloneArgs(args)
				const term = self.terms[state.i]
				const result = term(state.input, clonedArgs)
				results.push(result)
				if (!result.success) break
				else {
					state.input = result.tail
				}
				state.i++
			}
			
			const success = state.i >= self.terms.length
			if (!success) {
				const error = `Expected list of ${self.terms.length} terms`
				return Term.fail({
					self,
					children: results,
					error,
					term: self,
				})(input, args)
			}
			
			const error = `Found list of ${self.terms.length} terms`
			return Term.succeed({
				output: results.map(result => result.output).join(""),
				source: results.map(result => result.source).join(""),
				tail: state.input,
				term: self,
				children: results,
				error,
			})(input, args)
			
		}
		self.terms = terms
		return self
	}
	
	Term.or = (terms) => {
		const self = (input, args = {exceptions: []}) => {
			
			const state = {
				i: 0,
				exceptions: args.exceptions === undefined? [] : [...args.exceptions]
			}
			const results = []
			
			const terms = self.terms
			
			while (state.i < terms.length) {
				const term = terms[state.i]
				const newArgs = {...args}
				newArgs.exceptions = [...state.exceptions]
				if (state.exceptions.includes(term)) {
					state.i++
					state.exceptions = state.exceptions.filter(e => e !== term)
					continue
				}
				const result = term(input, newArgs)
				results.push(result)
				if (result.success) {
					const rejects = results.slice(0, -1)
					for (const i in rejects) {
						const reject = rejects[i]
						reject.error = `Reject ${Number(i) + 1} of ${rejects.length}: ` + reject.error
					}
					rejects.error = `Rejected ${rejects.length}`
					return Term.succeed({
						output: result.output,
						source: result.source,
						tail: result.tail,
						term: self,
						error: `Found choice ${state.i + 1} of ${terms.length}: ` + result.error,
						children: [...result, rejects]
					})(input, args)
				}
				state.i++
			}
			
			return Term.fail({
				term: self,
				error: `Expected one of ${terms.length} terms`,
				children: results,
			})(input, args)
		}
		self.terms = terms
		return self
	}
	
	Term.maybe = (term) => {
		const self = (input, args = {exceptions: []}) => {
			const result = self.term(input, args)
			if (!result.success) {
				result.success = true
				result.source = result.source === undefined? "": result.source
				result.output = result.output === undefined? "": result.output
			}
			result.error = `(Optional) ` + result.error
			result.term = self
			return result
		}
		self.term = term
		return self
	}
	
	Term.many = (term) => {
		const self = (input, args = {exceptions: []}) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (true) {
				const clonedArgs = cloneArgs(args)
				const result = self.term(state.input, clonedArgs)
				results.push(result)
				if (!result.success) break
				state.input = result.tail
				state.i++
			}
			
			const success = results.length > 1
			if (!success) {
				return Term.fail({
					term: self,
					children: results,
					error: `Expected multiple terms`,
				})(input, args)
			}
			
			return Term.succeed({
				output: results.map(result => result.output).join(""),
				source: results.map(result => result.source).join(""),
				tail: state.input,
				term: self,
				children: results,
				error: `Found ${results.length-1} terms`,
			})(input, args)
		}
		self.term = term
		return self
	}
	
	Term.args = (term, func) => {
		const self = (input, args = {exceptions: []}) => {
			const newArgs = self.func(cloneArgs(args))
			const result = self.term(input, newArgs)
			result.term = self
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.emit = (term, func) => {
		const self = (input, args = {exceptions: []}) => {
			const result = self.term(input, args)
			result.term = self
			result.output = self.func(result)
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.error = (term, func) => {
		const self = (input, args = {exceptions: []}) => {
			const result = self.term(input, args)
			result.error = self.func(result)
			result.term = self
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.check = (term, func) => {
		const self = (input, args = {exceptions: []}) => {
			const result = self.term(input, args)
			if (!result.success) {
				result.term = self
				return result
			}
			const checkResult = self.func(result)
			if (checkResult) {
				result.error = `Passed check: ` + result.error
				return result
			}
			return Term.fail({
				term: self,
				children: [...result],
				error: `Failed check: ` + result.error,
			})(input, args)
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.eof = (input, args = {exceptions: []}) => {
		if (input.length === 0) return Term.succeed({
			source: "",
			tail: "",
			term: Term.eof,
			error: `Found end of file`,
		})(input, args)
		return Term.fail({
			term: Term.eof,
			error: `Expected end of file but got '${input}'`,
		})(input, args)
	}
	
	Term.except = (term, exceptions) => {
		const self = (input, args = {exceptions: []}) => {
			const exceptions = args.exceptions === undefined? [] : args.exceptions
			const result = self.term(input, {...args, exceptions: [...exceptions, ...self.exceptions]})
			result.term = self
			return result
		}
		self.term = term
		self.exceptions = exceptions
		return self
	}
	
	Term.any = (term) => {
		const self = (input, args = {exceptions: []}) => {
			const result = self.term(input, {...args, exceptions: []})
			result.term = self
			return result
		}
		self.term = term
		return self
	}
	
	const getResultKey = (name, input, args = {exceptions: []}) => {
		const lines = []
		lines.push(name)
		lines.push(input)
		for (const key in args) {
			if (key === "exceptions") {
				lines.push("exceptions:" + args.exceptions.map(exception => exception.id.toString()))
				continue
			}
			const value = args[key]
			if (typeof value === "number") {
				lines.push(key + ":" + value)
				continue
			}
			
			if (typeof value === "string") {
				lines.push(key + `:"` + value + `"`)
				continue
			}
			
			if (typeof value === "boolean") {
				lines.push(key + `:` + value)
				continue
			}
			
			throw new Error("[Habitat.Term] Unimplemented: I don't know how to cache these arguments correctly...")
		}
		return lines.join("|")
	}
	
	const termCaches = new Map()
	let termCount = 0
	Term.terms = []
	
	const resultCachess = []
	Term.resetCache = () => {
		for (const caches of resultCachess) {
			caches.clear()
		}
	}
	
	Term.term = (key, object) => {
		
		// Get term from cache
		let termCache = termCaches.get(object)
		if (termCache === undefined) {
			termCache = {}
			termCaches.set(object, termCache)
		}
		if (termCache[key] !== undefined) {
			return termCache[key]
		}
		
		// Create term
		const resultCaches = new Map()
		resultCachess.push(resultCaches)
		const id = termCount++
		
		const self = (input, args = {exceptions: []}) => {
			
			const resultKey = getResultKey(key, input, args)
			const resultCache = resultCaches.get(resultKey)
			if (resultCache !== undefined) {
				//print("Use cache for:", resultKey)
				return resultCache
			}
			
			const term = object[key]
			
			if (term === undefined) throw new Error(`[Habitat.Term] Unrecognised term: '${key}'`)
			const result = term(input, args)
			if (result.success) {
				result.error = `Found ${key}: ` + result.error
			}
			else {
				result.error = `Expected ${key}: ` + result.error
			}
			
			const cachedResult = Term.result({
				success: result.success,
				source: result.source,
				output: result.output,
				tail: result.tail,
				term: result.term,
				error: `(Cached) ` + result.error,
				children: [...result],
			})(input, args)
			
			resultCaches.set(resultKey, cachedResult)
			
			return result
		}
		
		self.id = id
		Term.terms[id] = key
		termCache[key] = self
		
		return self
	}
	
	Term.chain = (first, second) => {
		const self = (input, args = {exceptions: []}) => {
			const firstResult = self.first(input, args)
			if (!firstResult.success) {
				//firstResult.error = `Expected translation: ` + firstResult.error
				return firstResult
			}
			
			const secondResult = self.second(firstResult.output, args)
			//secondResult.error = `Found translation: ` + firstResult.error + "\n\n" + secondResult.error
			return secondResult
			
		}
		self.first = first
		self.second = second
		return self
	}
	
	Habitat.Term = Term
	Habitat.Term.install = (global) => {
		global.Term = Habitat.Term	
		Habitat.Term.installed = true
	}
	
}
