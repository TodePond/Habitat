
Habitat.install = (global) => {
	for (const installer of Habitat.installers) {
		installer(global)
	}
}
