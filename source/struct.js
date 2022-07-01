//=======//
// Struct //
//=======//
{
	Habitat.Struct = {}
	Habitat.Struct.struct = (parameters) => (arguments) => ({...parameters, ...arguments})
	
	Habitat.Stage.install = (global) => {
		global.struct = Habitat.Struct.struct
		Habitat.struct = Habitat.Struct.struct
		Habitat.Struct.installed = true
	}
	
}