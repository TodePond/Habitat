//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {to, from, over = 1000, launch = 0.5, land = 0.5} = {}) {
				if (from === undefined) from = this[propertyName]
				if (to === undefined) to = this[propertyName]

				launch *= 2/3
				land = 1/3 + (1 - land) * 2/3

				Reflect.defineProperty(this, propertyName, {
					get: new Function(`
						const before = ${this[propertyName]}
						const start = ${performance.now()}
						const { from, to, over, launch, land } = ${JSON.stringify({to, from, over, launch, land})}
						const now = performance.now()

						if (now > start + over) {
							delete this.${propertyName}
							this.${propertyName} = to
							return to;
						} else {
							let t = (now - start) / over

							let v = 3*t*(1-t)*(1-t)*launch +
								3*t*t*(1-t)*land + t*t*t

							return v * (to - from) + from
						}

					`),
					set(value) {
						delete this[propertyName]
						this[propertyName] = to
					},
				})
			},
			
			configurable: true,
			enumerable: false,
			writable: true
		})
	}
}