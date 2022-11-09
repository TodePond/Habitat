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

let isMouseDownTracked = false
export const mouseDown = (buttonName) => {
	const button = buttonNames.indexOf(buttonName)
	if (!isMouseDownTracked) {
		isMouseDownTracked = true
		addEventListener("mousedown", (e) => fireEvent(`mouseDown("${e.button}")`), {passive: false})
	}
	return `mouseDown("${button}")`
}

let isMouseUpTracked = false
export const mouseUp = (buttonName) => {
	const button = buttonNames.indexOf(buttonName)
	if (!isMouseUpTracked) {
		isMouseUpTracked = true
		addEventListener("mouseup", (e) => fireEvent(`mouseUp("${e.button}")`), {passive: false})
	}
	return `mouseUp("${button}")`
}