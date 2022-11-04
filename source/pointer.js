let isCursorTracked = false
const buttonNames = ["Left", "Middle", "Right", "Back", "Forward"]
const cursor = {
	position: [undefined, undefined],
	down: undefined,
	buttons: {},
}

export const getCursor = () => {
	if (isCursorTracked) return cursor
	
	addEventListener("pointermove", (e) => {
		
	})

	return cursor
}