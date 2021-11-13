//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}
	
	const getSteps = ({from, to, over} = {}) => {
		if (to === undefined) to = this[propertyName]
		if (from === undefined) from = this[propertyName]
		if (over === undefined) over = 1000

		const difference = to - from
		const length = 60 * over/1000
		const step = difference / length

		const slope = 0.0

		const steps = []

		let x = from

		for (let i = 0; i < length; i++) {

			const easing = length-1-i
			const racing = i

			const ease = (easing * slope + racing) / (1 + slope)
			const race = (racing * slope + easing) / (1 + slope) 

			// EASE IN
			//x += step * 2 * ease / (length - 1)

			// EASE OUT
			x += step * 2 * race / (length - 1)
			steps.push(x)
		}

		return steps
	}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, options) {

				const steps = getSteps(options).d
				
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