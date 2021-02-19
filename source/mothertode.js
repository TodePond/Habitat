//============//
// MotherTode //
//============//
{
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		return source
	}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
	}
	
}
