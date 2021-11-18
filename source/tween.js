//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}
	
	let tt = true
	Habitat.Tween.getSteps = ({from, to, over, launch = 1.0, land = 1.0} = {}) => {
		if (to === undefined) to = this[propertyName]
		if (from === undefined) from = this[propertyName]
		if (over === undefined) over = 1000

		launch = 1.0 - launch
		land = 1.0 - land

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

		const steps = []
		let v = 0
		for (const j of jumps) {
			v += j
			steps.push(v)
		}

		const error = to / steps[steps.length-1]
		for (let i = 0; i < steps.length; i++) {
			steps[i] *= error
		}

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

				const steps = Habitat.Tween.getSteps(options)
				
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