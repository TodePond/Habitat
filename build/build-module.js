
const Habitat = {
	installers: [],
}
{
	const print = console.log.bind(console)
	
	const install = (global) => {
		global.print = print
	}
	
	Habitat.Console = {print}
	Habitat.installers.push(install)
}


Habitat.install = (global) => {
	for (const installer of Habitat.installers) {
		installer(global)
	}
}

export const print = Habitat.Console.print


export default Habitat
