//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {to, from, over = 1000, launch = 0.5, land = 0.5} = {}) {
				const before = this[propertyName]
				if (from === undefined) from = before
				if (to === undefined) to = before

				launch *= 2/3
				land = 1/3 + (1 - land) * 2/3

				const start = performance.now()

				Reflect.defineProperty(this, propertyName, {
					get() {
						const now = performance.now()

						if (now > start + over) {
							Reflect.defineProperty(this, propertyName, {
								value: to,
								writable: true,
								configurable: true,
								enumerable: true,
							})
							return to
						} else {
							const t = (now - start) / over
							const v = 3*t*(1-t)*(1-t)*launch + 3*t*t*(1-t)*land + t*t*t
							return v * (to - from) + from
						}

					},
					set(value) {
						Reflect.defineProperty(this, propertyName, {
							value,
							writable: true,
							configurable: true,
							enumerable: true,
						})
					},

					configurable: true,
					enumerable: true,
				})
			},
			
			configurable: true,
			enumerable: false,
			writable: true,
		})
	}
}