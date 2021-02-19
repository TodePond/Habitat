//======//
// Term //
//======//
{
	
	const Term = {}
	
	Term.result = ({success, source, output = source, tail, term, children = []} = {}) => {
		const self = (input, args=[]) => {			
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
		const term = (input, args=[]) => {
			const success = input.slice(0, string.length) === string
			if (!success) return Term.fail({term})(input, args)
			return Term.succeed({
				source: string,
				tail: input.slice(string.length),
				term,
				children: [],
			})(input, args)
		}
		term.string = string
		return term
	}
	
	Habitat.Term = Term
	Habitat.Term.install = (global) => {
		global.Term = Habitat.Term	
		Habitat.Term.installed = true
	}
	
}
