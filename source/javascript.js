//============//
// JavaScript //
//============//
{

	const JavaScript = (args) => {
		const source = String.raw(args)
		const lines = source.split("\n")
		let code = source
		if (lines.length === 1) code = `return ${code}`
		const func = new Function(code)()
		return func
	}

	const install = (global) => {
		global.JavaScript = JavaScript	

		Habitat.JavaScript.installed = true
		
	}
	
	Habitat.JavaScript = {install, JavaScript}
	
}
