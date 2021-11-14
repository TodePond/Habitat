//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}
	
	const getSteps = ({from, to, over, start, end} = {}) => {
		if (to === undefined) to = this[propertyName]
		if (from === undefined) from = this[propertyName]
		if (over === undefined) over = 1000
		if (start === undefined) start = 1.0
		if (end === undefined) end = 1.0

		const difference = to - from
		const length = 60 * over/1000
		const step = difference / length

		const slope = 0.0

		const steps = []

		let x = from

		for (let i = 1; i <= length; i++) {

			const easing = length-i
			const racing = i

			const ease = (easing*start + racing*end) / (end+start)
			const race = (racing*end + easing*start) / (start+end)

			// EASE IN
			x += step * ease / (length)

			// EASE OUT
			x += step * race / (length)
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