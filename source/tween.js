//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, options) {
				if (!options.from) options.from = this[propertyName]
				if (!options.to) options.to = this[propertyName]
				if (!options.over) options.over = 1000
				if (!options.launch) options.launch = 0.5
				if (!options.land) options.land = 0.5

				options.launch *= 2/3
				options.land = 1/3 + (1 - options.land) * 2/3

				Object.defineProperty(this, propertyName, {
					get: new Function(`
						const before = ${this[propertyName]}
						const start = ${performance.now()}
						const { from, to, over, launch, land } = ${JSON.stringify(options)}
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
					configurable: true,
					enumerable: false,
					writable: true
				})
			}
		})
	}
}