import { lerp } from "./lerp.js"
import { defineGetter } from "./property.js"

export const tween = (object, key, options) => {
	
	const value = object[key]

	const {
		start = value,
		end = value,
		duration = 1000,
		easeIn = 0.0,
		easeOut = 0.0,
		ratio = 0.5,
	} = options

	const startTime = performance.now()
	const endTime = startTime + duration


	defineGetter(object, key, () => {
		const currentTime = performance.now()

		if (currentTime >= endTime) {
			Reflect.defineProperty(object, key, {
				value: end,
				writable: true,
				configurable: true,
				enumerable: true,
			})
			return end
		}

		const time = currentTime - startTime
		const interpolation = ease(time / duration, {
			easeIn,
			easeOut,
			ratio: 1-ratio,
		})
		return lerp([start, end], interpolation)

	})

}

const ease = (t, {easeIn, easeOut, ratio}) => {
	const f = (t, slope) => t ** (1.0 + slope)
	return f(t*ratio*2, easeIn)/(f(t*ratio*2, easeIn) + f((1-t)*(1-ratio)*2, easeOut))
}