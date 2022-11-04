let isMouseTracked = false
const buttonNames = ["Left", "Middle", "Right", "Back", "Forward"]
const mouse = {
	position: [undefined, undefined],
}

export const getMouse = () => {
	if (isMouseTracked) return mouse
	isMouseTracked = true
	
	addEventListener("mousemove", (e) => {
		mouse.position[0] = e.clientX
		mouse.position[1] = e.clientY
	})

	addEventListener("mousedown", (e) => {
		mouse.position[0] = e.clientX
		mouse.position[1] = e.clientY
		const buttonName = buttonNames[e.button]
		mouse[buttonName] = true
	})
	
	addEventListener("mouseup", (e) => {
		mouse.position[0] = e.clientX
		mouse.position[1] = e.clientY
		const buttonName = buttonNames[e.button]
		mouse[buttonName] = false
	})

	return mouse
}