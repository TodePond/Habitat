//============//
// MotherTode //
//============//
{
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Habitat.MotherTode.scope.MotherTode.Term(source)
		return result
	}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
	}
}
