//======//
// Term //
//======//
{
	
	const Term = {}
	
	const makeLog = (result) => {
		const errors = []
		for (const child of result) {
			const childDebug = makeLog(child)
			errors.push(childDebug)
		}
		if (errors.length === 0) return result.error
		return [result.error, errors] 
	}
	
	const printTree = (value) => {
		console.groupCollapsed(value[0])
		printTreeValue(value[1])
		console.groupEnd()
	}
	
	const printTreeValue = (value) => {
		for (const v of value) {
			if (typeof v === "string") console.log(v)
			else printTree(v)
		}
	}
	
	Term.result = ({success, source, output = source, tail, term, error = "", children = []} = {}) => {
		const self = (input, args) => {			
			const result = [...children]
			result.success = success
			result.output = output
			result.source = source
			result.tail = tail === undefined? input : tail
			result.term = term
			result.error = error
			
			result.input = input
			result.args = {...args}
			result.toString = function() { return this.output }
			result.log = () => printTree(makeLog(result))
			return result
		}
		return self
	}
	
	Term.succeed = (properties = {}) => Term.result({...properties, success: true})
	Term.fail    = (properties = {}) => Term.result({...properties, success: false})
	
	Term.string = (string) => {
		const term = (input, args = {}) => {
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
		const term = (input, args = {}) => {
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
	
	Term.list = (terms) => {
		const self = (input, args) => {
			
			const state = {
				input,
				i: 0,
				args,
			}
			
			const results = []
			
			while (state.i < self.terms.length) {
				const term = self.terms[state.i]
				const result = term(state.input, state.args)
				results.push(result)
				if (!result.success) break
				else {
					state.input = result.tail
					state.args = result.args
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
			
			const state = {i: 0}
			const exceptions = args.exceptions === undefined? [] : args.exceptions
			const results = []
			
			const terms = self.terms.filter(t => !exceptions.includes(t))
			
			while (state.i < terms.length) {
				const term = terms[state.i]
				const result = term(input, args)
				results.push(result)
				if (result.success) {
					return result
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
		const self = (input, args) => {
			const result = self.term(input, args)
			if (!result.success) {
				result.success = true
				result.source = result.source === undefined? "": result.source
				result.output = result.output === undefined? "": result.output
			}
			result.error = `(Optional) ` + result.error
			return result
		}
		self.term = term
		return self
	}
	
	Term.many = (term) => {
		const self = (input, args) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (true) {
				const result = self.term(state.input, args)
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
	
	Term.emit = (term, func) => {
		const self = (input, args) => {
			const result = self.term(input, args)
			if (result.success) result.output = self.func(result)
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.error = (term, func) => {
		const self = (input, args) => {
			const result = self.term(input, args)
			result.error = self.func(result)
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.check = (term, func) => {
		const self = (input, args) => {
			const result = self.term(input, args)
			if (!result.success) return result
			const checkResult = self.func(result)
			if (checkResult) return result
			return Term.fail({
				term: self.term,
				children: result.children,
				error: `Failed check`,
			})(input, args)
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.eof = (input, args) => {
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
		const self = (input, args = {}) => {
			const exceptions = args.exceptions === undefined? [] : args.exceptions
			return self.term(input, {...args, exceptions: [...exceptions, ...self.exceptions]})
		}
		self.term = term
		self.exceptions = exceptions
		return self
	}
	
	Term.any = (term) => {
		const self = (input, args = {exceptions: []}) => self.term(input, {...args, exceptions: []})
		self.term = term
		return self
	}
	
	const caches = new Map()
	Term.term = (key, object) => {
		
		let cache = caches.get(object)
		if (cache === undefined) {
			cache = {}
			caches.set(object, cache)
		}
		if (cache[key] !== undefined) {
			return cache[key]
		}
		
		const self = (input, args) => {
			
			const term = object[key]
			
			if (term === undefined) throw new Error(`[Habitat.Term] Unrecognised term: '${key}'`)
			const result = term(input, args)
			if (result.success) {
				result.error = `Found ${key}: ` + result.error
			}
			else {
				result.error = `Expected ${key}: ` + result.error
			}
			return result
		}
		
		cache[key] = self
		
		return self
	}
	
	Term.chain = (first, second) => {
		const self = (input, args) => {
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
