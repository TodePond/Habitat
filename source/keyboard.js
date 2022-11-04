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
const keyDownFuncs = new Map()
export const onKeyDown = (key, func) => {
	if (!isKeyDownTracked) {
		isKeyDownTracked = true
		addEventListener("keydown", (e) => {
			const func = keyDownFuncs.get(key)
			if (func === undefined) return
			func(e)
		}, {passive: false})
	}
	keyDownFuncs.set(key, func)
}

let isKeyUpTracked = false
const keyUpFuncs = new Map()
export const onKeyUp = (key, func) => {
	if (!isKeyUpTracked) {
		isKeyUpTracked = true
		addEventListener("keyup", (e) => {
			const func = keyUpFuncs.get(key)
			if (func === undefined) return
			func(e)
		}, {passive: false})
	}
	keyUpFuncs.set(key, func)
}