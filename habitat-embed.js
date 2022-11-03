//=============//
// FROGASAURUS //
//=============//
const HabitatFrogasaurus = {}

//========//
// SOURCE //
//========//
{
	//====== ./array.js ======
	{
		HabitatFrogasaurus["./array.js"] = {}
		const shuffleArray = (array) => {
		
			// Go backwards through the array
			for (let i = array.length - 1; i > 0; i--) {
		
				// Swap each value with a random value before it (which might include itself)
				const j = Math.floor(Math.random() * (i+1))
				;[array[i], array[j]] = [array[j], array[i]]
		
			}
			return array
		}
		
		const trimArray = (array) => {
		
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
		
		const repeatArray = (array, count) => {
		
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

		HabitatFrogasaurus["./array.js"].shuffleArray = shuffleArray
		HabitatFrogasaurus["./array.js"].trimArray = trimArray
		HabitatFrogasaurus["./array.js"].repeatArray = repeatArray
	}

	//====== ./async.js ======
	{
		HabitatFrogasaurus["./async.js"] = {}
		const sleep = (duration) => {
			new Promise(resolve => setTimeout(resolve, duration))
		}

		HabitatFrogasaurus["./async.js"].sleep = sleep
	}

	//====== ./colour.js ======
	{
		HabitatFrogasaurus["./colour.js"] = {}
		//===========//
		// UTILITIES //
		//===========//
		const wrap = (number, min, max) => {
			const range = max - min + 1
			while (number < min) number += range
			while (number > max) number -= range
			return number
		}
		
		const getDigits = (number, digitCount) => {
			const chars = number.toString().padStart(digitCount, "0").split("")
			const digits = chars.map(v => parseInt(v))
			return digits
		}
		
		//=========//
		// CLASSES //
		//=========//
		const Colour = class extends Array {
			constructor(red, green, blue) {
				super()
				this.push(red, green, blue)
			}
		
			toString() {
				const [red, green, blue] = this.map(v => v.toString(16).padStart(2, "0"))
				return `#${red}${green}${blue}`
			}
		}
		
		const Splash = class extends Colour {
			constructor(number) {
				const wrappedNumber = wrap(number, 0, 999)
				const [hundreds, tens, ones] = getDigits(wrappedNumber, 3)
				const red = RED_SPLASH_VALUES[hundreds]
				const green = GREEN_SPLASH_VALUES[tens]
				const blue = BLUE_SPLASH_VALUES[ones]
				super(red, green, blue)
			}
		}
		
		//===========//
		// FUNCTIONS //
		//===========//
		const showColour = (colour) => {
			console.log("%c   ", `background-color: ${new Colour(...colour)}`)
		}
		
		//===========//
		// CONSTANTS //
		//===========//
		const RED_SPLASH_VALUES   = [23, 55, 70,  98, 128, 159, 174, 204, 242, 255]
		const GREEN_SPLASH_VALUES = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
		const BLUE_SPLASH_VALUES  = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]
		
		const VOID = new Colour(6, 7, 10)
		const BLACK = new Splash(0)
		const GREY = new Splash(112)
		const SILVER = new Splash(556)
		const WHITE = new Splash(999)
		
		const GREEN = new Splash(293)
		const RED = new Splash(911)
		const BLUE = new Splash(239)
		const YELLOW = new Splash(991)
		const ORANGE = new Splash(931)
		const PINK = new Splash(937)
		const CYAN = new Splash(269)
		const PURPLE = new Splash(418)
		const CORAL = new Splash(933)
		
		const HUES = [
			GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW,
		]
		
		const SHADES = [
			VOID, BLACK, GREY, SILVER, WHITE,
		]
		
		const COLOURS = [
			...SHADES,
			...HUES,
		]
		

		HabitatFrogasaurus["./colour.js"].Colour = Colour
		HabitatFrogasaurus["./colour.js"].Splash = Splash
		HabitatFrogasaurus["./colour.js"].showColour = showColour
		HabitatFrogasaurus["./colour.js"].VOID = VOID
		HabitatFrogasaurus["./colour.js"].BLACK = BLACK
		HabitatFrogasaurus["./colour.js"].GREY = GREY
		HabitatFrogasaurus["./colour.js"].SILVER = SILVER
		HabitatFrogasaurus["./colour.js"].WHITE = WHITE
		HabitatFrogasaurus["./colour.js"].GREEN = GREEN
		HabitatFrogasaurus["./colour.js"].RED = RED
		HabitatFrogasaurus["./colour.js"].BLUE = BLUE
		HabitatFrogasaurus["./colour.js"].YELLOW = YELLOW
		HabitatFrogasaurus["./colour.js"].ORANGE = ORANGE
		HabitatFrogasaurus["./colour.js"].PINK = PINK
		HabitatFrogasaurus["./colour.js"].CYAN = CYAN
		HabitatFrogasaurus["./colour.js"].PURPLE = PURPLE
		HabitatFrogasaurus["./colour.js"].CORAL = CORAL
		HabitatFrogasaurus["./colour.js"].HUES = HUES
		HabitatFrogasaurus["./colour.js"].SHADES = SHADES
		HabitatFrogasaurus["./colour.js"].COLOURS = COLOURS
	}

	//====== ./console.js ======
	{
		HabitatFrogasaurus["./console.js"] = {}
		
		const print = console.log.bind(console)
		
		let printCount = 0
		const print9 = (message) => {
			if (printCount > 9) return
			printCount++
			print(message)
		}
		
		const registerDebugMethods = (global) => {
			
			defineGetter(global.Object.prototype, "d", function() {
				const value = this.valueOf()
				print(value)
				return value
			})
			
			defineGetter(global.Object.prototype, "d9", function() {
				const value = this.valueOf()
				print9(value)
				return value
			})
		
		}

		HabitatFrogasaurus["./console.js"].print = print
		HabitatFrogasaurus["./console.js"].print9 = print9
		HabitatFrogasaurus["./console.js"].registerDebugMethods = registerDebugMethods
	}

	//====== ./document.js ======
	{
		HabitatFrogasaurus["./document.js"] = {}
		const $ = (...args) => document.querySelector(...args)
		const $$ = (...args) => document.querySelectorAll(...args)

		HabitatFrogasaurus["./document.js"].$ = $
		HabitatFrogasaurus["./document.js"].$$ = $$
	}

	//====== ./event.js ======
	{
		HabitatFrogasaurus["./event.js"] = {}
		const fireEvent = (name, options = {}) => {
			const {target = window, bubbles = true, cancelable = true, ...data} = options
			const event = new Event(name, {bubbles, cancelable})
			Object.assign(event, data)
			target.dispatchEvent(event)
		}

		HabitatFrogasaurus["./event.js"].fireEvent = fireEvent
	}

	//====== ./habitat.js ======
	{
		HabitatFrogasaurus["./habitat.js"] = {}
		const defineGetter = (object, name, get) => {
			return Reflect.defineProperty(object, name, {
				get,
				set(value) {
					Reflect.defineProperty(this, name, {
						value,
						configurable: true,
						writable: true,
						enumerable: true
					})
				},
				configurable: true,
				enumerable: false,
			})
		}

		HabitatFrogasaurus["./habitat.js"].defineGetter = defineGetter
	}

	//====== ./html.js ======
	{
		HabitatFrogasaurus["./html.js"] = {}
		const HTML = (source) => {
			const template = document.createElement("template")
			template.innerHTML = source
			const {content} = template
			if (content.childElementCount === 1) {
				return content.firstChild
			}
			return template.content
		}

		HabitatFrogasaurus["./html.js"].HTML = HTML
	}

	//====== ./javascript.js ======
	{
		HabitatFrogasaurus["./javascript.js"] = {}
		const JavaScript = (source) => {
			const code = `return ${source}`
			const value = new Function(code)()
			return value
		}

		HabitatFrogasaurus["./javascript.js"].JavaScript = JavaScript
	}

	//====== ./keyboard.js ======
	{
		HabitatFrogasaurus["./keyboard.js"] = {}
		const keyboard = {}
		let isKeyboardTracked = false
		const getKeyboard = () => {
			if (isKeyboardTracked) return keyboard
			addEventListener("keydown", (e) => {
				keyboard[e.key] = true
			})
			
			addEventListener("keyup", (e) => {
				keyboard[e.key] = false
			})
		
			return keyboard
		}

		HabitatFrogasaurus["./keyboard.js"].getKeyboard = getKeyboard
	}

	//====== ./linked-list.js ======
	{
		HabitatFrogasaurus["./linked-list.js"] = {}
		const LinkedList = class {
			constructor(iterable = []) {
				this.start = undefined
				this.end = undefined
				this.isEmpty = true
		
				for (const value of iterable) {
					this.push(value)
				}
			}
			
			*[Symbol.iterator]() {
				let link = this.start
				while (link !== undefined) {
					yield link.value
					link = link.next
				}
			}
		
			toString() {
				return [...this].toString()
			}
		
			push(value) {
				const link = makeLink(value)
				if (this.isEmpty) {
					this.start = link
					this.end = link
					this.isEmpty = false
				} else {
					this.end.next = link
					link.previous = this.end
					this.end = link
				}
			}
		
			pop() {
				if (this.isEmpty) {
					return undefined
				}
		
				const value = this.start.value
				if (this.start === this.end) {
					this.clear()
					return value
				}
		
				this.end = this.end.previous
				this.end.next = undefined
				return value
			}
		
			shift() {
				if (this.isEmpty) {
					return undefined
				}
		
				const value = this.start.value
				if (this.start === this.end) {
					this.clear()
					return value
				}
		
				this.start = this.start.next
				this.start.previous = undefined
				return value
			}
		
			clear() {
				this.start = undefined
				this.end = undefined
				this.isEmpty = true
			}
		
			setStart(link) {
				this.start = link
				link.previous = undefined
			}
		
		}
		
		const makeLink = (value) => {
			const previous = undefined
			const next = undefined
			const link = {value, previous, next}
			return link
		}

		HabitatFrogasaurus["./linked-list.js"].LinkedList = LinkedList
	}

	const { defineGetter } = HabitatFrogasaurus["./habitat.js"]

}

//=========//
// EXPORTS //
//=========//
const Habitat = {
	shuffleArray: HabitatFrogasaurus["./array.js"].shuffleArray,
	trimArray: HabitatFrogasaurus["./array.js"].trimArray,
	repeatArray: HabitatFrogasaurus["./array.js"].repeatArray,
	sleep: HabitatFrogasaurus["./async.js"].sleep,
	Colour: HabitatFrogasaurus["./colour.js"].Colour,
	Splash: HabitatFrogasaurus["./colour.js"].Splash,
	showColour: HabitatFrogasaurus["./colour.js"].showColour,
	VOID: HabitatFrogasaurus["./colour.js"].VOID,
	BLACK: HabitatFrogasaurus["./colour.js"].BLACK,
	GREY: HabitatFrogasaurus["./colour.js"].GREY,
	SILVER: HabitatFrogasaurus["./colour.js"].SILVER,
	WHITE: HabitatFrogasaurus["./colour.js"].WHITE,
	GREEN: HabitatFrogasaurus["./colour.js"].GREEN,
	RED: HabitatFrogasaurus["./colour.js"].RED,
	BLUE: HabitatFrogasaurus["./colour.js"].BLUE,
	YELLOW: HabitatFrogasaurus["./colour.js"].YELLOW,
	ORANGE: HabitatFrogasaurus["./colour.js"].ORANGE,
	PINK: HabitatFrogasaurus["./colour.js"].PINK,
	CYAN: HabitatFrogasaurus["./colour.js"].CYAN,
	PURPLE: HabitatFrogasaurus["./colour.js"].PURPLE,
	CORAL: HabitatFrogasaurus["./colour.js"].CORAL,
	HUES: HabitatFrogasaurus["./colour.js"].HUES,
	SHADES: HabitatFrogasaurus["./colour.js"].SHADES,
	COLOURS: HabitatFrogasaurus["./colour.js"].COLOURS,
	print: HabitatFrogasaurus["./console.js"].print,
	print9: HabitatFrogasaurus["./console.js"].print9,
	registerDebugMethods: HabitatFrogasaurus["./console.js"].registerDebugMethods,
	$: HabitatFrogasaurus["./document.js"].$,
	$$: HabitatFrogasaurus["./document.js"].$$,
	fireEvent: HabitatFrogasaurus["./event.js"].fireEvent,
	defineGetter: HabitatFrogasaurus["./habitat.js"].defineGetter,
	HTML: HabitatFrogasaurus["./html.js"].HTML,
	JavaScript: HabitatFrogasaurus["./javascript.js"].JavaScript,
	getKeyboard: HabitatFrogasaurus["./keyboard.js"].getKeyboard,
	LinkedList: HabitatFrogasaurus["./linked-list.js"].LinkedList,
}