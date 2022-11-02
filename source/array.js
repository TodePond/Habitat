export const shuffleArray = (array) => {

	// Go backwards through the array
	for (let i = array.length - 1; i > 0; i--) {

		// Swap each value with a random value before it (which might include itself)
		const j = Math.floor(Math.random() * (i+1))
		;[array[i], array[j]] = [array[j], array[i]]

	}
	return array
}

export const trimArray = (array) => {

	// If the array is empty just return it
	if (array.length == 0) return array

	let start = array.length - 1
	let end = 0

	// Find the first non-undefined index
	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		if (value !== undefined) {
			start = i
			break
		}
	}

	// Find the last non-undefined index
	for (let i = array.length - 1; i >= 0; i--) {
		const value = array[i]
		if (value !== undefined) {
			end = i + 1
			break
		}
	}

	// Cut off the start and end of the array
	array.splice(end)
	array.splice(0, start)
	return array
}

export const repeatArray = (array, count) => {

	// If count is zero, empty the array
	if (count === 0) {
		array.splice(0)
		return array
	}

	// If count is less than zero, reverse the array
	else if (count < 0) {
		array.reverse()
		count = Math.abs(count)
	}

	// Otherwise repeat the array
	const clone = [...array]
	for (let i = 0; i < count-1; i++) {
		array.push(...clone)
	}

	return array
}