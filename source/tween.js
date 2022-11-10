import { defineGetter } from "./property.js"

export const tween = (object, key, options) => {
	
	const value = object[key]

	const {
		from = value,
		to = value,
		duration = 1000,
	} = options

	const startTime = performance.now()
	const endTime = startTime + duration


	defineGetter(object, key, () => {
		const currentTime = performance.now()

		if (currentTime >= endTime) {
			Reflect.defineProperty(object, key, {
				value: to,
				writable: true,
				configurable: true,
				enumerable: true,
			})
			return to
		}

		return 0.5 //TODO: after lerp!

	})

}