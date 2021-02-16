//=======//
// Input //
//=======//
{

	const Keyboard = {}
	const Mouse = {
		position: [undefined, undefined],
	}
	
	const buttonMap = ["Left", "Middle", "Right", "Back", "Forward"]
	
	const install = (global) => {
		
		// Mouse
		global.Mouse = Mouse
		global.addEventListener("mousedown", e => {
			const buttonName = buttonMap[e.button]
			Mouse[buttonName] = true
		})
		
		global.addEventListener("mouseup", e => {
			const buttonName = buttonMap[e.button]
			Mouse[buttonName] = false
		})
		
		global.addEventListener("mousemove", e => {
			Mouse.position[0] = event.clientX
			Mouse.position[1] = event.clientY
		})
		
		// Keyboard
		global.Keyboard = Keyboard
		global.addEventListener("keydown", e => {
			Keyboard[e.key] = true
		})
		
		global.addEventListener("keyup", e => {
			Keyboard[e.key] = false
		})
		
	}
	
	Habitat.Input = {install, Mouse, Keyboard}
	
}
