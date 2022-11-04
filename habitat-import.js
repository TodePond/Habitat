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
		const wrapSplashNumber = (number) => {
			while (number < 0) number += 1000
			while (number > 999) number -= 1000
			return number
		}
		
		const getThreeDigits = (number) => {
			const chars = number.toString().padStart(3, "0").split("")
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
				const wrappedNumber = wrapSplashNumber(number)
				const [hundreds, tens, ones] = getThreeDigits(wrappedNumber, 3)
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
		const CYAN = new Splash(269)
		const BLUE = new Splash(239)
		const PURPLE = new Splash(418)
		const PINK = new Splash(937)
		const CORAL = new Splash(933)
		const RED = new Splash(911)
		const ORANGE = new Splash(931)
		const YELLOW = new Splash(991)
		
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
		HabitatFrogasaurus["./colour.js"].CYAN = CYAN
		HabitatFrogasaurus["./colour.js"].BLUE = BLUE
		HabitatFrogasaurus["./colour.js"].PURPLE = PURPLE
		HabitatFrogasaurus["./colour.js"].PINK = PINK
		HabitatFrogasaurus["./colour.js"].CORAL = CORAL
		HabitatFrogasaurus["./colour.js"].RED = RED
		HabitatFrogasaurus["./colour.js"].ORANGE = ORANGE
		HabitatFrogasaurus["./colour.js"].YELLOW = YELLOW
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
		
		const registerMethods = () => {
			registerDebugMethods()
		}

		HabitatFrogasaurus["./habitat.js"].registerMethods = registerMethods
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

	//====== ./json.js ======
	{
		HabitatFrogasaurus["./json.js"] = {}
		const _ = (...value) => {
			return JSON.stringify(value)
		}

		HabitatFrogasaurus["./json.js"]._ = _
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
		
			push(...values) {
				for (const value of values) {
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

	//====== ./memo.js ======
	{
		HabitatFrogasaurus["./memo.js"] = {}
		const memo = (func) => {
			const cache = new Map()
			return (...args) => {
				const key = JSON.stringify(args)
				if (cache.has(key)) {
					return cache.get(key)
				}
		
				const result = func(...args)
				cache.set(key, result)
				return result
			}
		}

		HabitatFrogasaurus["./memo.js"].memo = memo
	}

	//====== ./number.js ======
	{
		HabitatFrogasaurus["./number.js"] = {}
		const clamp = (number, min, max) => {
			if (number < min) return min
			if (number > max) return max
			return number
		}
		
		const wrap = (number, min, max) => {
			const range = max - min + 1
			while (number < min) number += range
			while (number > max) number -= range
			return number
		}
		
		const getDigits = (number) => {
			const chars = number.toString().split("")
			const digits = chars.map(v => parseInt(v)).filter(v => !isNaN(v))
			return digits
		}
		
		const gcd = (...numbers) => {
			const [head, ...tail] = numbers
			if (numbers.length === 1) return head
			if (numbers.length > 2) return gcd(head, gcd(...tail))
			
			let [a, b] = [head, ...tail]
			while (true) {
				if (b === 0) return a
				a = a % b
				if (a === 0) return b
				b = b % a
			}
		}
		
		const simplifyRatio = (...numbers) => {
			const divisor = gcd(...numbers)
			return numbers.map(n => n / divisor)
		}
		
		const numbersBetween = function* (start, end) {
			let i = start
			if (i <= end) do {
				yield i
				i++
			} while (i <= end) else while (i >= end) {
				yield i
				i--
			}
		}

		HabitatFrogasaurus["./number.js"].clamp = clamp
		HabitatFrogasaurus["./number.js"].wrap = wrap
		HabitatFrogasaurus["./number.js"].getDigits = getDigits
		HabitatFrogasaurus["./number.js"].gcd = gcd
		HabitatFrogasaurus["./number.js"].simplifyRatio = simplifyRatio
		HabitatFrogasaurus["./number.js"].numbersBetween = numbersBetween
	}

	//====== ./pointer.js ======
	{
		HabitatFrogasaurus["./pointer.js"] = {}
		let isCursorTracked = false
		const cursor = {
			position: [undefined, undefined]
		}
		const getCursor = () => {
			addEventListener
		}

		HabitatFrogasaurus["./pointer.js"].getCursor = getCursor
	}

	//====== ./property.js ======
	{
		HabitatFrogasaurus["./property.js"] = {}
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

		HabitatFrogasaurus["./property.js"].defineGetter = defineGetter
	}

	const { defineGetter } = HabitatFrogasaurus["./property.js"]
	const { registerDebugMethods } = HabitatFrogasaurus["./console.js"]

}

//=========//
// EXPORTS //
//=========//
export const { shuffleArray, trimArray, repeatArray } = HabitatFrogasaurus["./array.js"]
export const { sleep } = HabitatFrogasaurus["./async.js"]
export const { Colour, Splash, showColour, VOID, BLACK, GREY, SILVER, WHITE, GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW, HUES, SHADES, COLOURS } = HabitatFrogasaurus["./colour.js"]
export const { print, print9, registerDebugMethods } = HabitatFrogasaurus["./console.js"]
export const { $, $$ } = HabitatFrogasaurus["./document.js"]
export const { fireEvent } = HabitatFrogasaurus["./event.js"]
export const { registerMethods } = HabitatFrogasaurus["./habitat.js"]
export const { HTML } = HabitatFrogasaurus["./html.js"]
export const { JavaScript } = HabitatFrogasaurus["./javascript.js"]
export const { _ } = HabitatFrogasaurus["./json.js"]
export const { getKeyboard } = HabitatFrogasaurus["./keyboard.js"]
export const { LinkedList } = HabitatFrogasaurus["./linked-list.js"]
export const { memo } = HabitatFrogasaurus["./memo.js"]
export const { clamp, wrap, getDigits, gcd, simplifyRatio, numbersBetween } = HabitatFrogasaurus["./number.js"]
export const { getCursor } = HabitatFrogasaurus["./pointer.js"]
export const { defineGetter } = HabitatFrogasaurus["./property.js"]

export const Habitat = {
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
	CYAN: HabitatFrogasaurus["./colour.js"].CYAN,
	BLUE: HabitatFrogasaurus["./colour.js"].BLUE,
	PURPLE: HabitatFrogasaurus["./colour.js"].PURPLE,
	PINK: HabitatFrogasaurus["./colour.js"].PINK,
	CORAL: HabitatFrogasaurus["./colour.js"].CORAL,
	RED: HabitatFrogasaurus["./colour.js"].RED,
	ORANGE: HabitatFrogasaurus["./colour.js"].ORANGE,
	YELLOW: HabitatFrogasaurus["./colour.js"].YELLOW,
	HUES: HabitatFrogasaurus["./colour.js"].HUES,
	SHADES: HabitatFrogasaurus["./colour.js"].SHADES,
	COLOURS: HabitatFrogasaurus["./colour.js"].COLOURS,
	print: HabitatFrogasaurus["./console.js"].print,
	print9: HabitatFrogasaurus["./console.js"].print9,
	registerDebugMethods: HabitatFrogasaurus["./console.js"].registerDebugMethods,
	$: HabitatFrogasaurus["./document.js"].$,
	$$: HabitatFrogasaurus["./document.js"].$$,
	fireEvent: HabitatFrogasaurus["./event.js"].fireEvent,
	registerMethods: HabitatFrogasaurus["./habitat.js"].registerMethods,
	HTML: HabitatFrogasaurus["./html.js"].HTML,
	JavaScript: HabitatFrogasaurus["./javascript.js"].JavaScript,
	_: HabitatFrogasaurus["./json.js"]._,
	getKeyboard: HabitatFrogasaurus["./keyboard.js"].getKeyboard,
	LinkedList: HabitatFrogasaurus["./linked-list.js"].LinkedList,
	memo: HabitatFrogasaurus["./memo.js"].memo,
	clamp: HabitatFrogasaurus["./number.js"].clamp,
	wrap: HabitatFrogasaurus["./number.js"].wrap,
	getDigits: HabitatFrogasaurus["./number.js"].getDigits,
	gcd: HabitatFrogasaurus["./number.js"].gcd,
	simplifyRatio: HabitatFrogasaurus["./number.js"].simplifyRatio,
	numbersBetween: HabitatFrogasaurus["./number.js"].numbersBetween,
	getCursor: HabitatFrogasaurus["./pointer.js"].getCursor,
	defineGetter: HabitatFrogasaurus["./property.js"].defineGetter,
}