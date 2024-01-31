let isPointerTracked = false
const pointer = {
	position: [undefined, undefined],
	down: undefined,
}

export const getPointer = () => {
	if (isPointerTracked) return pointer
	isPointerTracked = true

	addEventListener("pointermove", (e) => {
		pointer.position[0] = e.clientX
		pointer.position[1] = e.clientY
	})

	addEventListener("pointerdown", (e) => {
		pointer.position[0] = e.clientX
		pointer.position[1] = e.clientY
		pointer.down = true
	})

	addEventListener("pointerup", (e) => {
		pointer.position[0] = e.clientX
		pointer.position[1] = e.clientY
		pointer.down = false
	})

	return pointer
}
