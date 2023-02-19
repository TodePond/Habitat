const maxRandomNumberIndex = 2 ** 14
const randomNumbersBuffer = new Uint32Array(maxRandomNumberIndex)
let randomNumberIndex = Infinity

export const random = () => {
	if (randomNumberIndex >= maxRandomNumberIndex) {
		crypto.getRandomValues(randomNumbersBuffer)
		randomNumberIndex = 0
	}
	const result = randomNumbersBuffer[randomNumberIndex]
	randomNumberIndex++
	return result
}

export const randomFrom = (array) => {
	const index = random() % array.length
	return array[index]
}

export const randomBetween = (min, max) => {
	const range = max - min
	return (random() % range) + min
}

export const oneIn = (times) => random() % times < 1
export const maybe = (chance) => oneIn(1 / chance)
