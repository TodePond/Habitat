import { on } from "./event.js"

const touches = []

let isTouchTracked = false
export const getTouches = () => {
	if (!isTouchTracked) {
		isTouchTracked = true

		on("touchstart", e => {
			for (const changedTouch of e.changedTouches) {
				const id = changedTouch.identifier
				if (touches[id] === undefined) {
					touches[id] = {position: [undefined, undefined]}
				}
				
				const touch = touches[id]
				touch.position[0] = changedTouch.clientX
				touch.position[1] = changedTouch.clientY
			}
		})
		
		on("touchmove", e => {
			for (const changedTouch of e.changedTouches) {
				const id = changedTouch.identifier
				const touch = touches[id]
				touch.position[0] = changedTouch.clientX
				touch.position[1] = changedTouch.clientY
			}
		})
		
		on("touchend", e => {
			for (const changedTouch of e.changedTouches) {
				const id = changedTouch.identifier
				touches[id] = undefined
			}
		})

	}

	return touches
}