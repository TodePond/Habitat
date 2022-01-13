
Habitat.install(this)

setInterval(() => {

	const number = Random.Uint32 % 1000
	const colour = Colour.splash(number)

}, 1000/60)
