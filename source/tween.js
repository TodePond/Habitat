//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}
	
	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {from, to, over} = {}) {
				if (to === undefined) to = this[propertyName]
				if (from === undefined) from = this[propertyName]
				if (over === undefined) over = 1000
				over = 60 * over/1000
				const difference = to - from

				const promise = new Promise((resolve) => {
					let i = 0
					const tweener = setInterval(() => {
						
						this[propertyName] = from + i*difference/over
						
						i++
						if (i > over) {
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