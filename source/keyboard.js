import { fireEvent } from "./event.js"

const keyboard = {}
let isKeyboardTracked = false
export const getKeyboard = () => {
	if (isKeyboardTracked) return keyboard
	isKeyboardTracked = true
	addEventListener("keydown", (e) => {
		keyboard[e.key] = true
	})
	
	addEventListener("keyup", (e) => {
		keyboard[e.key] = false
	})

	return keyboard
}

let isKeyDownTracked = false
export const keyDown = (key) => {
	if (!isKeyDownTracked) {
		isKeyDownTracked = true
		addEventListener("keydown", (e) => fireEvent(`keyDown("${e.key}")`), {passive: false})
	}
	return `keyDown("${key}")`
}

let isKeyUpTracked = false
export const keyUp = (key) => {
	if (!isKeyUpTracked) {
		isKeyUpTracked = true
		addEventListener("keyup", (e) => fireEvent(`keyUp("${e.key}")`), {passive: false})
	}
	return `keyUp("${key}")`
}