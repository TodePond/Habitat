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
			const func = keyDownFuncs.get(e.key)
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
			const funcs = keyUpFuncs.get(e.key)
			if (funcs === undefined) return
			for (const func of funcs) {
				func(e)
			}
		}, {passive: false})
	}

	let funcs = keyUpFuncs(key)
	if (funcs === undefined) {
		funcs = []
		keyUpFuncs.set(key, funcs)
	}
	
	funcs.push(func)
}