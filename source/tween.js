//=======//
// Tween //
//=======//

Habitat = {}

{
	Habitat.Tween = {}
	
	// all from https://easings.net
	Habitat.Tween.EASE_IN_LINEAR = (t) => t
	Habitat.Tween.EASE_OUT_LINEAR = (t) => t
	Habitat.Tween.EASE_IN_OUT_LINEAR = (t) => t
	Habitat.Tween.EASE_IN_SINE = (t) => 1-Math.cos(t*Math.PI/2)
	Habitat.Tween.EASE_OUT_SINE = (t) => Math.sin(t*Math.PI/2)
	Habitat.Tween.EASE_IN_OUT_SINE = (t) => -(Math.cos(t*Math.PI)-1)/2
	Habitat.Tween.EASE_IN_POWER = (p) => (t) => Math.pow(t, p)
	Habitat.Tween.EASE_OUT_POWER = (p) => (t) => 1-Math.pow(1-t, p)
	Habitat.Tween.EASE_IN_OUT_POWER = (p) => (t) => {
		if (t < 0.5) return Math.pow(2, p-1)*Math.pow(t, p)
		return 1 - Math.pow(2 - 2*t, p)/2
	}
	Habitat.Tween.EASE_IN_EXP = Habitat.Tween.EASE_IN_EXPONENTIAL = (e) => (t) => Math.pow(2, e*t - e) * t
	Habitat.Tween.EASE_OUT_EXP = Habitat.Tween.EASE_OUT_EXPONENTIAL = (e) => (t) => 1 - Math.pow(2, -e*t) * (1-t)
	Habitat.Tween.EASE_IN_OUT_EXP = Habitat.Tween.EASE_IN_OUT_EXPONENTIAL = (e) => (t) => {
		if (t < 0.5) return Math.pow(2, 2*e*t - e)/2
		return (2 - Math.pow(2, -2*e*t + e))/2
	}
	Habitat.Tween.EASE_IN_CIRCULAR = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2))
	Habitat.Tween.EASE_OUT_CIRCULAR = (t) => Math.sqrt(1 - Math.pow(t - 1, 2))
	Habitat.Tween.EASE_IN_OUT_CIRCULAR = (t) => {
		if (t < 0.5) return 0.5 - Math.sqrt(1 - Math.pow(2*t, 2))/2
		return 0.5 + Math.sqrt(1 - Math.pow(-2*t + 2, 2))/2
	}
	Habitat.Tween.EASE_IN_BACK = (t) => 2.70158*t*t*t - 1.70158*t*t
	Habitat.Tween.EASE_OUT_BACK = (t) => 1 + 2.70158*Math.pow(t - 1, 3) + 1.70158*Math.pow(t - 1, 2)
	Habitat.Tween.EASE_IN_OUT_BACK = (t) => {
		if (t < 0.5) return (Math.pow(2*t, 2)*(3.59491*2*t - 2.59491))/2
		return (Math.pow(2*t-2,2)*(3.59491*(t*2-2) + 2.59491)+2)/2
	}
	Habitat.Tween.EASE_IN_ELASTIC = (t) => -Math.pow(2,10*t-10)*Math.sin((t*10-10.75)*2*Math.PI/3)
	Habitat.Tween.EASE_OUT_ELASTIC = (t) => Math.pow(2,-10*t)*Math.sin((t*10-0.75)*2*Math.PI/3)+1
	Habitat.Tween.EASE_IN_OUT_ELASTIC = (t) => {
		if (t < 0.5) return -(Math.pow(2, 20*t-10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2
		return (Math.pow(2, -20*t+10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2+1
	}
	Habitat.Tween.EASE_OUT_BOUNCE = (t) => (t) => {
		const n1 = 7.5625
		const d1 = 2.75

		if      (t < 1 / d1)   return n1 * t * t
		else if (t < 2 / d1)   return n1 * (t -= 1.5 / d1) * t + 0.75
		else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
		else                   return n1 * (t -= 2.625 / d1) * t + 0.984375
	}
	Habitat.Tween.EASE_IN_BOUNCE = (t) => 1-Habitat.Tween.EASE_OUT_BOUNCE(1-t)
	Habitat.Tween.EASE_IN_OUT_BOUNCE = (t) => {
		if (t < 0.5) return (1-Habitat.Tween.EASE_OUT_BOUNCE(1-2*t))/2
		return (1+Habitat.Tween.EASE_OUT_BOUNCE(2*t-1))/2
	}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {to, from, over = 1000, launch = 0.5, land = 0.5, strength = 1, ease = false} = {}) {
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
								enumerable: true
							})
							return to
						}

						const t = (now - start) / over

						if (ease) {
							const v = ease(strength)
							if (typeof v == 'function') return v(t) * (to - from) + from
							return ease(t) * (to - from) + from
						}

						const v = 3*t*(1-t)*(1-t)*launch + 3*t*t*(1-t)*land + t*t*t
						return v * (to - from) + from

					},
					set() { },

					configurable: true,
					enumerable: true
				})
			},
			
			configurable: true,
			enumerable: false,
			writable: true
		})
	}
}
