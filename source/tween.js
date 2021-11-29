//=======//
// Tween //
//=======//
{
	Habitat.Tween = {}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {to, from, over = 1000, launch = 0.5, land = 0.5, ease=false} = {}) {
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
						} else {
							const t = (now - start) / over
							if (typeof ease == 'function') return ease(t) * (to - from) + from
							if (typeof ease == 'string') {
								// all from https://easings.net
								let ob = (t) => {
									const n1 = 7.5625
									const d1 = 2.75
									
									if      (t < 1 / d1)   return n1 * t * t
									else if (t < 2 / d1)   return n1 * (t -= 1.5 / d1) * t + 0.75
									else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
									else                   return n1 * (t -= 2.625 / d1) * t + 0.984375
								}
								let easefuncs = {
									easeinlinear: t => t,
									easeoutlinear: t => t,
									easeinoutlinear: t => t,
									easeinsine: t => 1-Math.cos(t*Math.PI/2),
									easeoutsine: t => Math.sin(t*Math.PI/2),
									easeinoutsine: t => -(Math.cos(t*Math.PI)-1)/2,
									easeinquadratic: t => Math.pow(t,2),
									easeoutquadratic: t => 1-Math.pow(1-t,2),
									easeinoutquadratic: t => t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2,
									easeincubic: t => Math.pow(t,3),
									easeoutcubic: t => 1-Math.pow(1-t,3),
									easeinoutcubic: t => t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2,
									easeinquartic: t => Math.pow(t,4),
									easeoutquartic: t => 1-Math.pow(1-t,4),
									easeinoutquartic: t => t<0.5 ? 8*t*t*t*t : 1-Math.pow(-2*t+2,4)/2,
									easeinquintic: t => Math.pow(t,5),
									easeoutquintic: t => 1-Math.pow(1-t,5),
									easeinoutquintic: t => t<0.5 ? 16*t*t*t*t*t : 1-Math.pow(-2*t+2,5)/2,
									easeinexponential: t => t==0 ? 0 : Math.pow(2,10*t-10),
									easeoutexponential: t => t==1 ? 1 : 1-Math.pow(2,-10*t),
									easeinoutexponential: t => t==0 ? 0 : t==1 ? 1 : t<0.5 ? Math.pow(2,20*t-10)/2 : (2-Math.pow(2,-20*t+10))/2,
									easeincircular: t => 1-Math.sqrt(1-Math.pow(t,2)),
									easeoutcircular: t => Math.sqrt(1-Math.pow(t-1,2)),
									easeinoutcircular: t => t<0.5 ? (1-Math.sqrt(1-Math.pow(2*t,2)))/2 : (Math.sqrt(1-Math.pow(-2*t+2,2))+1)/2,
									easeinback: t => 2.70158*t*t*t-1.70158*t*t,
									easeoutback: t => 1+2.70158*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2),
									easeinoutback: t => t<0.5 ? (Math.pow(2*t,2)*((3.59491)*2*t-2.59491))/2 : (Math.pow(2*t-2,2)*((3.59491)*(t*2-2)+2.59491)+2)/2,
									easeinelastic: t => t==0 ? 0 : t==1 ? 1 : -Math.pow(2,10*t-10)*Math.sin((t*10-10.75)*2*Math.PI/3),
									easeoutelastic: t => t==0 ? 0 : t==1 ? 1 : Math.pow(2,-10*t)*Math.sin((t*10-0.75)*2*Math.PI/3)+1,
									easeinoutelastic: t => t==0 ? 0 : t==1 ? 1 : t<0.5 ? -(Math.pow(2,20*t-10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2 : (Math.pow(2,-20*t+10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2+1,
									easeinbounce: t => 1-ob(1-t),
									easeoutbounce: ob,
									easeinoutbounce: t => t<0.5 ? (1-ob(1-2*t))/2 : (1+ob(2*t-1))/2
								}
								if (ease.toLowerCase() in Object.keys(easefuncs))
									return easefuncs[ease.toLowerCase()](t) * (to - from) + from
							}
							const v = 3*t*(1-t)*(1-t)*launch + 3*t*t*(1-t)*land + t*t*t
							return v * (to - from) + from
						}

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
