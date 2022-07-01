//========//
// Struct //
//========//
{
	Habitat.Struct = {}
	Habitat.Struct.struct = (parameters) => (arguments) => ({...parameters, ...arguments})
	
	Habitat.Struct.install = (global) => {
		global.struct = Habitat.Struct.struct
		Habitat.struct = Habitat.Struct.struct
		Habitat.Struct.installed = true
	}
	
}