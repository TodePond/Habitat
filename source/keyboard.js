import { fireEvent, on } from "./event.js"

const keyboard = {}
let isKeyboardTracked = false
export const getKeyboard = () => {
	if (isKeyboardTracked) return keyboard
	isKeyboardTracked = true
	on("keydown", (e) => {
		keyboard[e.key] = true
	})
	
	on("keyup", (e) => {
		keyboard[e.key] = false
	})

	return keyboard
}

let isKeyDownTracked = false
export const keyDown = (key) => {
	if (!isKeyDownTracked) {
		isKeyDownTracked = true
		on("keydown", (e) => fireEvent(`keyDown("${e.key}")`), {passive: false})
	}
	return `keyDown("${key}")`
}

let isKeyUpTracked = false
export const keyUp = (key) => {
	if (!isKeyUpTracked) {
		isKeyUpTracked = true
		on("keyup", (e) => fireEvent(`keyUp("${e.key}")`), {passive: false})
	}
	return `keyUp("${key}")`
}