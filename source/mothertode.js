//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Habitat.MotherTode.scope.Source(source)
		if (!result.success) {
			throw new Error(`[MotherTode]\n\n` + result.error + `\n\n`)
			return
		}
		const func = new Function("scope", "return " + result.output.d)
		const scope = {}
		const finalResult = func(scope)
		finalResult.scope = scope
		return finalResult
	}
	
	Habitat.MotherTode.scope = {}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
	}
}
