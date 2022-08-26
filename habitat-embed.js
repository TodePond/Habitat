Frogasaurus.files["source/console.js"] = async () => {
	const registerGlobal = Frogasaurus.import("registerGlobal")
	
	const print = console.log.bind(console)
	registerGlobal({print})

	Frogasaurus.export(print, "print")
}

Frogasaurus.files["source/global.js"] = async () => {
	const globals = {}
	const install = (globalObject) => {
		for (const key in globals) {
			const value = globals[key]
			globalObject[key] = value
		}
	}
	
	const registerGlobal = ({key, value}) => {
		globals[key] = value
	}

	Frogasaurus.export(install, "install")
	Frogasaurus.export(registerGlobal, "registerGlobal")
}