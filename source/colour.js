//===========//
// UTILITIES //
//===========//
const wrap = (number, min, max) => {
	const range = max - min + 1
	while (number < min) number += range
	while (number > max) number -= range
	return number
}

const getDigits = (number) => {
	const chars = number.toString().padStart(3, "0").split("")
	const digits = chars.map(v => parseInt(v))
	return digits
}

//=========//
// CLASSES //
//=========//
export const Colour = class extends Array {
	constructor(red, green, blue) {
		super()
		this.push(red, green, blue)
	}

	toString() {
		const [red, green, blue] = this.map(v => v.toString(16).padStart(2, "0"))
		return `#${red}${green}${blue}`
	}

}

export const Splash = class extends Colour {
	constructor(number) {
		const [hundreds, tens, ones] = getDigits(wrap(number, 0, 999))
		const red = RED_SPLASH_VALUES[hundreds]
		const green = GREEN_SPLASH_VALUES[tens]
		const blue = BLUE_SPLASH_VALUES[ones]
		super(red, green, blue)
	}
}

//===========//
// FUNCTIONS //
//===========//
export const showColour = (colour) => {
	console.log("%c   ", `background-color: ${colour}`)
}

//===========//
// CONSTANTS //
//===========//
const RED_SPLASH_VALUES   = [23, 55, 70,  98, 128, 159, 174, 204, 242, 255]
const GREEN_SPLASH_VALUES = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
const BLUE_SPLASH_VALUES  = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]

export const VOID = new Colour("rgb(6, 7, 10)")
export const BLACK = new Splash(0)
export const GREY = new Splash(112)
export const SILVER = new Splash(556)
export const WHITE = new Splash(999)

export const GREEN = new Splash(293)
export const RED = new Splash(911)
export const BLUE = new Splash(239)
export const YELLOW = new Splash(961)
export const ORANGE = new Splash(931)
export const PINK = new Splash(936)
export const CYAN = new Splash(269)
export const PURPLE = new Splash(418)
export const CORAL = new Splash(933)

export const RAINBOW_COLOURS = [
	GREEN, RED, BLUE, YELLOW, ORANGE, PINK, CYAN, PURPLE,
]

export const ALL_COLOURS = [
	BLACK, GREY, SILVER, WHITE,
	GREEN, RED, BLUE, YELLOW, ORANGE, PINK, CYAN, PURPLE,
	CORAL,
]
