//======//
// Term //
//======//
{
	
	const Term = {}
	
	Term.result = ({success, source, output = source, tail, term, children = []} = {}) => {
		const self = (input, args) => {			
			const result = [...children]
			result.success = success
			result.output = output
			result.source = source
			result.tail = tail === undefined? input : tail
			result.term = term
			
			result.input = input
			result.args = args
			result.toString = function() { return this.output }
			return result
		}
		return self
	}
	
	Term.succeed = (properties = {}) => Term.result({...properties, success: true})
	Term.fail    = (properties = {}) => Term.result({...properties, success: false})
	
	Term.string = (string) => {
		const term = (input, args) => {
			const success = input.slice(0, term.string.length) === term.string
			if (!success) return Term.fail({term})(input, args)
			return Term.succeed({
				source: term.string,
				tail: input.slice(term.string.length),
				term,
				children: [],
			})(input, args)
		}
		term.string = string
		return term
	}
	
	Term.regExp = (regExp) => {
		const term = (input, args) => {
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
				})(input, args)
				i++
			}
			return Term.fail({term})(input, args)
		}
		term.regExp = regExp
		return term
	}
	
	Term.list = (terms) => {
		const self = (input, args) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (state.i < self.terms.length) {
				const term = self.terms[state.i]
				const result = term(state.input, args)
				results.push(result)
				if (!result.success) break
				else state.input = result.tail
				state.i++
			}
			
			const success = state.i >= self.terms.length
			if (!success) return Term.fail({
				self,
				children: results,
			})(input, args)
			
			return Term.succeed({
				output: results.map(result => result.output).join(""),
				source: results.map(result => result.source).join(""),
				tail: state.input,
				term: self,
				children: results,
			})(input, args)
			
		}
		self.terms = terms
		return self
	}
	
	Term.or = (terms) => {
		const self = (input, args = {exceptions: []}) => {
			
			const state = {i: 0}
			const {exceptions} = args
			
			while (state.i < self.terms.length) {
				const term = self.terms[state.i]
				const result = term(input, args)
				if (result.success) return result
				state.i++
			}
			
			return Term.fail({self})(input, args)
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
			return result
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
	
	Habitat.Term = Term
	Habitat.Term.install = (global) => {
		global.Term = Habitat.Term	
		Habitat.Term.installed = true
	}
	
}
