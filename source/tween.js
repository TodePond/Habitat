//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}
	
	let tt = true
	Habitat.Tween.getSteps = ({from, to, over, launch = 1.0, land = 1.0} = {}, value) => {
		if (to === undefined) to = value
		if (from === undefined) from = value
		if (over === undefined) over = 1000

		launch = 1.0 - launch
		land = 1.0 - land

		const offset = from
		to -= offset
		from -= offset

		const difference = to - from
		const length = 60 * over/1000

		const jump = difference / length
		const jumps = [jump].repeat(length)

		for (let i = 0; i < length; i++) {
			const j = jumps[i]

			const startness = (length-(i*land)) / length
			const endness = (i*launch+1) / length

			jumps[i] = j * (endness * startness)
		}

		let steps = []
		let v = 0
		for (const j of jumps) {
			v += j
			steps.push(v)
		}
		
		const error = (to) / (steps[steps.length-1])
		steps = steps.map(s => s * error)
		steps = steps.map(s => s + offset)

		/*for (const s of jumps) {
			if (tt) print("=".repeat(s*100))
			else print("-".repeat(s*100))
			tt = !tt
		}*/

		/*for (const s of steps) {
			if (tt) print("=".repeat(s))
			else print("-".repeat(s))
			tt = !tt
		}*/

		return steps
	}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, options) {

				const steps = Habitat.Tween.getSteps(options, this[propertyName])
				
				const promise = new Promise((resolve) => {
					let i = 0
					const tweener = setInterval(() => {
						
						this[propertyName] = steps[i]
						
						i++
						if (i >= steps.length) {
							clearInterval(tweener)
							resolve()
						}
	
					}, 1000 / 60)

				})

				return promise

			},
			configurable: true,
			enumerable: false,
			writable: true,
		})

	}
	
}