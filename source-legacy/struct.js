//========//
// Struct //
//========//
{
	Habitat.Struct = {}
	Habitat.Struct.struct = (parameters) => (args) => ({...parameters, ...args})
	
	Habitat.Struct.install = (global) => {
		global.struct = Habitat.Struct.struct
		Habitat.struct = Habitat.Struct.struct
		Habitat.Struct.installed = true
	}
	
}