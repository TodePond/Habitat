//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Term.term("MotherTode", Habitat.MotherTode.scope)(source, {indentSize: 0})
		if (!result.success) return
		
		const term = result.output
		term.success = result.success
		term.output = result.output
		term.source = result.source
		term.tail = result.tail
		term.input = result.input
		term.args = result.args
		term.error = result.error
		term.log = () => {
			result.log()
			return term
		}
		
		for (let i = 0; i < result.length; i++) {
			term[i] = result[i]
		}
		
		return term
	}
	
	Habitat.MotherTode.scope = {}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
		
		// Shorthand
		const scope = Habitat.MotherTode.scope
		const Term = Habitat.Term
		
		//========//
		// Source //
		//========//
		scope.MotherTode = Term.error(
			Term.emit(
				Term.list([
					Term.string(`"Hello world!"`, scope),
					Term.eof,
				]),
				(result) => {
					if (!result.success) {
						result.log()
						return result[0].output
					}
					
					print(result.output)
					result.log()
					const func = new Function("scope", "return " + result.output)
					const term = func()
					return term
				},
			),
			(result) => {
				return result.error
			},
		)
		
	}
}
