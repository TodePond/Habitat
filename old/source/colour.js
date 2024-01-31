import { defineAccessor } from "./property.js"

//===========//
// UTILITIES //
//===========//
const wrapSplashNumber = (number) => {
	while (number < 0) number += 1000
	while (number > 999) number -= 1000
	return number
}

const getThreeDigits = (number) => {
	const chars = number.toString().padStart(3, "0").split("")
	const digits = chars.map((v) => parseInt(v))
	return digits
}

//=========//
// CLASSES //
//=========//
export const Colour = class extends Array {
	constructor(red, green, blue, alpha = 255) {
		super()
		this.push(red, green, blue)
		if (alpha !== undefined) {
			this.push(alpha)
		}
	}

	toString() {
		const [red, green, blue, alpha] = this.map((v) => v.toString(16).padStart(2, "0"))
		if (this.alpha === 255) {
			return `#${red}${green}${blue}`
		}

		return `#${red}${green}${blue}${alpha}`
	}
}

export const Splash = class extends Colour {
	constructor(number) {
		const wrappedNumber = wrapSplashNumber(number)
		const [hundreds, tens, ones] = getThreeDigits(wrappedNumber, 3)
		const red = RED_SPLASH_VALUES[hundreds]
		const green = GREEN_SPLASH_VALUES[tens]
		const blue = BLUE_SPLASH_VALUES[ones]
		super(red, green, blue)
		Reflect.defineProperty(this, "splash", { value: wrappedNumber, enumerable: false })
	}
}

//===========//
// FUNCTIONS //
//===========//
export const showColour = (colour) => {
	console.log("%c   ", `background-color: ${new Colour(...colour)}`)
}

//=========//
// METHODS //
//=========//
export const registerColourMethods = () => {
	defineAccessor(
		Array.prototype,
		"red",
		function () {
			return this[0]
		},
		function (value) {
			this[0] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"green",
		function () {
			return this[1]
		},
		function (value) {
			this[1] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"blue",
		function () {
			return this[2]
		},
		function (value) {
			this[2] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"alpha",
		function () {
			return this[3]
		},
		function (value) {
			this[3] = value
		},
	)
}

//===========//
// CONSTANTS //
//===========//
const RED_SPLASH_VALUES = [23, 55, 70, 98, 128, 159, 174, 204, 242, 255]
const GREEN_SPLASH_VALUES = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
const BLUE_SPLASH_VALUES = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]

export const VOID = new Colour(6, 7, 10)
export const BLACK = new Splash(0)
export const GREY = new Splash(112)
export const SILVER = new Splash(556)
export const WHITE = new Splash(999)

export const GREEN = new Splash(293)
export const CYAN = new Splash(269)
export const BLUE = new Splash(239)
export const PURPLE = new Splash(418)
export const PINK = new Splash(937)
export const CORAL = new Splash(933)
export const RED = new Splash(911)
export const ORANGE = new Splash(931)
export const YELLOW = new Splash(991)

export const HUES = [GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW]

export const SHADES = [VOID, BLACK, GREY, SILVER, WHITE]

export const COLOURS = [...SHADES, ...HUES]
