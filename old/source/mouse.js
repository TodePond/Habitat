import { on } from "./event.js"

let isMouseTracked = false
const buttonNames = ["Left", "Middle", "Right", "Back", "Forward"]
const mouse = {
	position: [undefined, undefined],
}

export const getMouse = () => {
	if (isMouseTracked) return mouse
	isMouseTracked = true

	on("mousemove", (e) => {
		mouse.position[0] = e.clientX
		mouse.position[1] = e.clientY
	})

	on("mousedown", (e) => {
		mouse.position[0] = e.clientX
		mouse.position[1] = e.clientY
		const buttonName = buttonNames[e.button]
		mouse[buttonName] = true
	})

	on("mouseup", (e) => {
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
		on("mousedown", (e) => fireEvent(`mouseDown("${e.button}")`), { passive: false })
	}
	return `mouseDown("${button}")`
}

let isMouseUpTracked = false
export const mouseUp = (buttonName) => {
	const button = buttonNames.indexOf(buttonName)
	if (!isMouseUpTracked) {
		isMouseUpTracked = true
		on("mouseup", (e) => fireEvent(`mouseUp("${e.button}")`), { passive: false })
	}
	return `mouseUp("${button}")`
}
