{
	const print = console.log.bind(console)
	
	const install = (global) => {
		global.print = print
	}
	
	Habitat.Console = {print}
	Habitat.installers.push(install)
}
