//============//
// JavaScript //
//============//
{
	
	Habitat.JS = (source) => {
		const code = `return ${source}`
		const func = new Function(code)()
		return func
	}
	
	Habitat.JS.install = (global) => {
		global.JS = Habitat.JS	
		Habitat.JS.installed = true
	}
	
}
