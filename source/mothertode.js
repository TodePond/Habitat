//============//
// MotherTode //
//============//
{
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Habitat.MotherTode.scope.MotherTode.Source(source)
		if (!result.success) {
			throw new Error(`[MotherTode]\n\n` + result.error + `\n\n`)
			return
		}
		const func = new Function("scope", "return " + result.output.d)
		return func({})
	}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
	}
}
