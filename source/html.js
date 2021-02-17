//======//
// HTML //
//======//
{

	const HTML = (args) => {
		const source = String.raw(args)
		const template = document.createElement("template")
		template.innerHTML = source
		return template.content
	}

	const install = (global) => {
		global.HTML = HTML	

		Habitat.HTML.installed = true
		
	}
	
	Habitat.HTML = {install, HTML}
	
}
