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
const mouseDownFuncs = new Map()
export const onMouseDown = (buttonName, func) => {
	const button = buttonNames.indexOf(buttonName)
	if (button === -1) throw new Error(`[Habitat] I don't recognise mouse button '${buttonName}'`)
	if (!isMouseDownTracked) {
		isMouseDownTracked = true
		addEventListener("mousedown", (e) => {
			const func = mouseDownFuncs.get(e.button)
			if (func === undefined) return
			func(e)
		}, {passive: false})
	}
	mouseDownFuncs.set(button, func)
}

let isMouseUpTracked = false
const mouseUpFuncs = new Map()
export const onMouseUp = (buttonName, func) => {
	const button = buttonNames.indexOf(buttonName)
	if (button === -1) throw new Error(`[Habitat] I don't recognise mouse button '${buttonName}'`)
	if (!isMouseUpTracked) {
		isMouseUpTracked = true
		addEventListener("mouseup", (e) => {
			const func = mouseUpFuncs.get(e.button)
			if (func === undefined) return
			func(e)
		}, {passive: false})
	}
	mouseUpFuncs.set(button, func)
}