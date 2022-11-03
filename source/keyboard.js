const keyboard = {}
let isKeyboardTracked = false
export const getKeyboard = () => {
	if (isKeyboardTracked) return keyboard
	addEventListener("keydown", (e) => {
		keyboard[e.key] = true
	})
	
	addEventListener("keyup", (e) => {
		keyboard[e.key] = false
	})

	return keyboard
}