const Habitat = {}

//=======//
// Array //
//=======//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Array.prototype, "last", {
			get() {
				return this[this.length-1]
			},
			set(value) {
				Reflect.defineProperty(this, "last", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Array.prototype, "clone", {
			get() {
				return [...this]
			},
			set(value) {
				Reflect.defineProperty(this, "clone", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Array.prototype, "at", {
			value(position) {
				if (position >= 0) return this[position]
				return this[this.length + position]
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "shuffle", {
			value() {
				for (let i = this.length - 1; i > 0; i--) {
					const r = Math.floor(Math.random() * (i+1))
					;[this[i], this[r]] = [this[r], this[i]]
				}
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "trim", {
			value() {
				if (this.length == 0) return this
				let start = this.length - 1
				let end = 0
				for (let i = 0; i < this.length; i++) {
					const value = this[i]
					if (value !== undefined) {
						start = i
						break
					}
				}
				for (let i = this.length - 1; i >= 0; i--) {
					const value = this[i]
					if (value !== undefined) {
						end = i + 1
						break
					}
				}
				this.splice(end)
				this.splice(0, start)
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "repeat", {
			value(n) {
				if (n === 0) {
					this.splice(0)
					return this
				}
				if (n < 0) {
					this.reverse()
					n = n - n - n 
				}
				const clone = [...this]
				for (let i = 1; i < n; i++) {
					this.push(...clone)
				}
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Array.installed = true
		
	}
	
	Habitat.Array = {install}
	
}

//=======//
// Async //
//=======//
{
	const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))
	const install = (global) => {
		global.sleep = sleep
		Habitat.Async.installed = true
	}
	
	Habitat.Async = {install, sleep}
}

//========//
// Colour //
//========//
{
	
	Habitat.Colour = {}
	
	Habitat.Colour.hsl = (h, s, l) => {

		h = wrap(h, 0, 360)
		s = wrap(s, 0, 100)
		l = wrap(l, 0, 100)

		const [r, g, b] = getRGB(h, s, l)
		return makeColour([r, g, b], [h, s, l])
	}

	Habitat.Colour.rgb = (r, g, b) => {
		
		r = wrap(r, 0, 255)
		g = wrap(g, 0, 255)
		b = wrap(b, 0, 255)

		const [h, s, l] = getHSL(r, g, b)
		return makeColour([r, g, b], [h, s, l])
	}

	const hexify = (n) => {
		const string = n.toString(16)
		if (string.length === 2) return string
		return "0"+string
	}

	const makeColour = ([r, g, b], [h, s, l]) => {
		
		r = wrap(r, 0, 255)
		g = wrap(g, 0, 255)
		b = wrap(b, 0, 255)
		
		h = wrap(h, 0, 360)
		s = wrap(s, 0, 100)
		l = wrap(l, 0, 100)

		const rgb = `rgb(${r}, ${g}, ${b})`
		const hsl = `hsl(${h}, ${s}%, ${l}%)`
		const hex = `#${hexify(r)}${hexify(g)}${hexify(b)}`

		const colour = new Uint8Array([r, g, b])

		colour.r = r
		colour.g = g
		colour.b = b
		
		colour.red = r
		colour.green = g
		colour.blue = b

		colour.h = h
		colour.s = s
		colour.l = l

		colour.hue = h
		colour.saturation = s
		colour.lightness = l
		
		colour.toString = () => hex
		colour.hex = hex
		colour.rgb = rgb
		colour.hsl = hsl

		colour.brightness = (r*299 + g*587 + b*114) / 1000 / 255
		colour.isLight = colour.brightness > 0.7
		colour.isDark = colour.brightness < 0.3

		return colour
	}

	//https://css-tricks.com/converting-color-spaces-in-javascript/
	//https://en.wikipedia.org/wiki/HSL_and_HSV
	const getRGB = (h, s, l) => {

		let r = 0
		let g = 0
		let b = 0

		s /= 100
		l /= 100

		const c = (1 - Math.abs(2 * l - 1)) * s
		const h_ = h / 60
		const x = c * (1 - h_ % 2 - 1)
		const m = l - c/2

		if (0 <= h && h < 60) {
			r = c
			g = x
			b = 0
		}
		else if (60 <= h && h < 120) {
			r = x
			g = c
			b = 0
		}
		else if (120 <= h && h < 180) {
			r = 0
			g = c
			b = x
		}
		else if (180 <= h && h < 240) {
			r = 0
			g = x
			b = c
		}
		else if (240 <= h && h < 300) {
			r = x
			g = 0
			b = c
		}
		else if (300 <= h && h < 360) {
			r = c
			g = 0
			b = x
		}
		
		r = Math.round((r+m) * 255)
		g = Math.round((g+m) * 255)
		b = Math.round((b+m) * 255)

		return [r, g, b]

	}

	//https://css-tricks.com/converting-color-spaces-in-javascript/
	const getHSL = (r, g, b) => {

		let h = 0
		let l = 0
		let s = 0
		
		r /= 255
		g /= 255
		b /= 255
		
		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		const delta = max - min
		
		if (delta === 0) h = 0
		else if (max === r) h = ((g-b) / delta) % 6
		else if (max === g) h = ((b-r) / delta) + 2
		else if (max === b) h = ((r-g) / delta) + 4
		
		h = Math.round(h * 60)
		while (h < 0) h += 360

		l = (max + min) / 2

		if (delta === 0) s = 0
		else s = delta / (1 - Math.abs(2*l-1)) + Number.EPSILON 

		s *= 100
		l *= 100

		return [h, s, l]
	}

	const clamp = (number, min, max) => {
		if (number < min) return min
		if (number > max) return max
		return number
	}

	const wrap = (number, min, max) => {
		const difference = max - min
		while (number < min) number += difference
		while (number > max) number -= difference
		return number
	}

	Habitat.Colour.add = (colour, {r=0, g=0, b=0, red=0, green=0, blue=0, h=0, s=0, l=0, hue=0, saturation=0, lightness=0} = {}) => {
		
		const nr = clamp(colour.r + r + red, 0, 255)
		const ng = clamp(colour.g + g + green, 0, 255)
		const nb = clamp(colour.b + b + blue, 0, 255)
		const rgbColour = Habitat.Colour.rgb(nr, ng, nb)
		
		const nh = wrap(rgbColour.h + h + hue, 0, 360)
		const ns = clamp(rgbColour.s + s + saturation, 0, 100)
		const nl = clamp(rgbColour.l + l + lightness, 0, 100)
		const hslColour = Habitat.Colour.hsl(nh, ns, nl)

		return hslColour

	}

	Habitat.Colour.Void = Habitat.Colour.rgb(6, 7, 10)
	Habitat.Colour.Black = Habitat.Colour.rgb(23, 29, 40)
	Habitat.Colour.Grey = Habitat.Colour.rgb(55, 67, 98)
	Habitat.Colour.Silver = Habitat.Colour.rgb(159, 174, 201)
	Habitat.Colour.White = Habitat.Colour.rgb(242, 245, 247)

	Habitat.Colour.Green = Habitat.Colour.rgb(70, 255, 128)
	Habitat.Colour.Red = Habitat.Colour.rgb(255, 70, 70)
	Habitat.Colour.Blue = Habitat.Colour.rgb(70, 128, 255)
	Habitat.Colour.Yellow = Habitat.Colour.rgb(255, 204, 70)
	Habitat.Colour.Orange = Habitat.Colour.rgb(255, 128, 70)
	Habitat.Colour.Pink = Habitat.Colour.rgb(255, 128, 128)
	Habitat.Colour.Rose = Habitat.Colour.rgb(255, 128, 204)
	Habitat.Colour.Cyan = Habitat.Colour.rgb(70, 204, 255)
	Habitat.Colour.Purple = Habitat.Colour.rgb(128, 70, 255)

	Habitat.Colour.install = (global) => {
		global.Colour = Habitat.Colour
		Habitat.Colour.installed = true
	}
	
}

//=========//
// Console //
//=========//
{
	const print = console.log.bind(console)
	const dir = (value) => console.dir(Object(value))
	
	let print9Counter = 0
	const print9 = (message) => {
		if (print9Counter >= 9) return
		print9Counter++
		console.log(message)
	}
	
	const install = (global) => {
		global.print = print
		global.dir = dir
		global.print9 = print9
		
		Reflect.defineProperty(global.Object.prototype, "d", {
			get() {
				const value = this.valueOf()
				console.log(value)
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Object.prototype, "dir", {
			get() {
				console.dir(this)
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "dir", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		let d9Counter = 0
		Reflect.defineProperty(global.Object.prototype, "d9", {
			get() {
				const value = this.valueOf()
				if (d9Counter < 9) {
					console.log(value)
					d9Counter++
				}
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d9", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Habitat.Console.installed = true
		
	}
	
	Habitat.Console = {install, print, dir, print9}
}

//==========//
// Document //
//==========//
{

	const $ = (...args) => document.querySelector(...args)
	const $$ = (...args) => document.querySelectorAll(...args)

	const install = (global) => {
	
	
		global.$ = $
		global.$$ = $$
		
		if (global.Node === undefined) return
		
		Reflect.defineProperty(global.Node.prototype, "$", {
			value(...args) {
				return this.querySelector(...args)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Node.prototype, "$$", {
			value(...args) {
				return this.querySelectorAll(...args)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Document.installed = true
		
	}
	
	Habitat.Document = {install, $, $$}
	
}


//=======//
// Event //
//=======//
{

	const install = (global) => {
	
		Reflect.defineProperty(global.EventTarget.prototype, "on", {
			get() {
				return new Proxy(this, {
					get: (element, eventName) => (...args) => element.addEventListener(eventName, ...args),
				})
			},
			set(value) {
				Reflect.defineProperty(this, "on", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.EventTarget.prototype, "trigger", {
			value(name, options = {}) {
				const {bubbles = true, cancelable = true, ...data} = options
				const event = new Event(name, {bubbles, cancelable})
				for (const key in data) event[key] = data[key]
				this.dispatchEvent(event)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Event.installed = true
		
	}
	
	Habitat.Event = {install}
	
}


//======//
// HTML //
//======//
{

	Habitat.HTML = (...args) => {
		const source = String.raw(...args)
		const template = document.createElement("template")
		template.innerHTML = source
		return template.content
	}

	Habitat.HTML.install = (global) => {
		global.HTML = Habitat.HTML
		Habitat.HTML.installed = true
	}
	
}


//============//
// JavaScript //
//============//
{
	
	Habitat.JavaScript = (...args) => {
		const source = String.raw(...args)
		const code = `return ${source}`
		const func = new Function(code)()
		return func
	}
	
	Habitat.JavaScript.install = (global) => {
		global.JavaScript = Habitat.JavaScript	
		Habitat.JavaScript.installed = true
	}
	
}


//==========//
// Keyboard //
//==========//
{

	const Keyboard = Habitat.Keyboard = {}
	Reflect.defineProperty(Keyboard, "install", {
		value(global) {
			global.Keyboard = Keyboard
			global.addEventListener("keydown", e => {
				Keyboard[e.key] = true
			})
			
			global.addEventListener("keyup", e => {
				Keyboard[e.key] = false
			})
			
			Reflect.defineProperty(Keyboard, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
}


//======//
// Main //
//======//
Habitat.install = (global) => {

	if (Habitat.installed) return

	if (!Habitat.Array.installed)      Habitat.Array.install(global)
	if (!Habitat.Async.installed)      Habitat.Async.install(global)
	if (!Habitat.Colour.installed)     Habitat.Colour.install(global)
	if (!Habitat.Console.installed)    Habitat.Console.install(global)
	if (!Habitat.Document.installed)   Habitat.Document.install(global)
	if (!Habitat.Event.installed)      Habitat.Event.install(global)
	if (!Habitat.HTML.installed)       Habitat.HTML.install(global)
	if (!Habitat.JavaScript.installed) Habitat.JavaScript.install(global)
	if (!Habitat.Keyboard.installed)   Habitat.Keyboard.install(global)
	if (!Habitat.Math.installed)       Habitat.Math.install(global)
	if (!Habitat.Mouse.installed)      Habitat.Mouse.install(global)
	if (!Habitat.Number.installed)     Habitat.Number.install(global)
	if (!Habitat.Object.installed)     Habitat.Object.install(global)
	if (!Habitat.Property.installed)   Habitat.Property.install(global)
	if (!Habitat.Random.installed)     Habitat.Random.install(global)
	if (!Habitat.Stage.installed)      Habitat.Stage.install(global)
	if (!Habitat.String.installed)     Habitat.String.install(global)
	if (!Habitat.Touches.installed)    Habitat.Touches.install(global)
	if (!Habitat.Tween.installed)      Habitat.Tween.install(global)
	if (!Habitat.Type.installed)       Habitat.Type.install(global)
	
	Habitat.installed = true
	
}

//======//
// Math //
//======//
{
	
	const gcd = (...numbers) => {
		const [head, ...tail] = numbers
		if (numbers.length === 1) return head
		if (numbers.length  >  2) return gcd(head, gcd(...tail))
		
		let [a, b] = [head, ...tail]
		
		while (true) {
			if (b === 0) return a
			a = a % b
			if (a === 0) return b
			b = b % a
		}
		
	}
	
	const reduce = (...numbers) => {
		const divisor = gcd(...numbers)
		return numbers.map(n => n / divisor)
	}

	const wrap = (number, min, max) => {
		const difference = max - min
		while (number > max) {
			number -= difference
		}
		while (number < min) {
			number += difference
		}
		return number
	}
	
	const install = (global) => {
		global.Math.gcd = Habitat.Math.gcd
		global.Math.reduce = Habitat.Math.reduce
		global.Math.wrap = Habitat.Math.wrap
		Habitat.Math.installed = true
	}
	
	
	Habitat.Math = {install, gcd, reduce, wrap}
	
}


//=======//
// Mouse //
//=======//
{

	const Mouse = Habitat.Mouse = {
		position: [undefined, undefined],
	}
	
	const buttonMap = ["Left", "Middle", "Right", "Back", "Forward"]
	
	Reflect.defineProperty(Mouse, "install", {
		value(global) {
			global.Mouse = Mouse
			global.addEventListener("mousedown", e => {
				const buttonName = buttonMap[e.button]
				Mouse[buttonName] = true
			})
			
			global.addEventListener("mouseup", e => {
				const buttonName = buttonMap[e.button]
				Mouse[buttonName] = false
			})
			
			global.addEventListener("mousemove", e => {
				Mouse.position[0] = event.clientX
				Mouse.position[1] = event.clientY
			})
			
			Reflect.defineProperty(Mouse, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
}


//========//
// Number //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(global.Number.prototype, "to", {
			value: function* (v) {
				let i = this.valueOf()
				if (i <= v) {
					while (i <= v) {
						yield i
						i++
					}
				}
				else {
					while (i >= v) {
						yield i
						i--
					}
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		const numberToString = global.Number.prototype.toString
		Reflect.defineProperty(global.Number.prototype, "toString", {
			value(base, size) {
				if (size === undefined) return numberToString.call(this, base)
				if (size <= 0) return ""
				const string = numberToString.call(this, base)
				return string.slice(-size).padStart(size, "0")
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		if (global.BigInt !== undefined) {
			const bigIntToString = global.BigInt.prototype.toString
			Reflect.defineProperty(global.BigInt.prototype, "toString", {
				value(base, size) {
					if (size === undefined) return bigIntToString.call(this, base)
					if (size <= 0) return ""
					const string = bigIntToString.call(this, base)
					return string.slice(-size).padStart(size, "0")
				},
				configurable: true,
				enumerable: false,
				writable: true,
			})
		}
		
		Habitat.Number.installed = true
		
	}
	
	Habitat.Number = {install}
	
}

//========//
// Object //
//========//
{
	Habitat.Object = {}
	Habitat.Object.install = (global) => {
		
		Reflect.defineProperty(global.Object.prototype, Symbol.iterator, {
			value: function*() {
				for (const key in this) {
					yield this[key]
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "keys", {
			value() {
				return Object.keys(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "values", {
			value() {
				return Object.values(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "entries", {
			value() {
				return Object.entries(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Object.installed = true
		
	}
	
}

//==========//
// Property //
//==========//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Object.prototype, "_", {
			get() {
				return new Proxy(this, {
					set(object, propertyName, descriptor) {
						Reflect.defineProperty(object, propertyName, descriptor)
					},
					get(object, propertyName) {
						const editor = {
							get value() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {value} = descriptor
								return value
							},
							set value(value) {
								const {enumerable, configurable, writable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true, writable: true}
								const descriptor = {value, enumerable, configurable, writable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get get() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {get} = descriptor
								return get
							},
							set get(get) {
								const {set, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get set() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {set} = descriptor
								return set
							},
							set set(set) {
								const {get, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get enumerable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {enumerable} = descriptor
								return enumerable
							},
							set enumerable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {configurable: true, writable: true}
								descriptor.enumerable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get configurable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {configurable} = descriptor
								return configurable
							},
							set configurable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, writable: true}
								descriptor.configurable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get writable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {writable} = descriptor
								return writable
							},
							set writable(v) {
								const oldDescriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const {get, set, writable, ...rest} = oldDescriptor
								const newDescriptor = {...rest, writable: v}
								Reflect.defineProperty(object, propertyName, newDescriptor)
							},
						}
						return editor
					},
				})
			},
			set(value) {
				Reflect.defineProperty(this, "_", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		
		Habitat.Property.installed = true
		
	}
	
	Habitat.Property = {install}
	
}

//========//
// Random //
//========//
{
	Habitat.Random = {}
	
	const maxId8 = 2 ** 16
	const u8s = new Uint8Array(maxId8)
	let id8 = maxId8
	const getRandomUint8 = () => {
		
		if (id8 >= maxId8) {
			crypto.getRandomValues(u8s)
			id8 = 0
		}
		
		const result = u8s[id8]
		id8++
		return result
	}
	
	Reflect.defineProperty(Habitat.Random, "Uint8", {
		get: getRandomUint8,
		configurable: true,
		enumerable: true,
	})
	
	const maxId32 = 2 ** 14
	const u32s = new Uint32Array(maxId32)
	let id32 = maxId32
	const getRandomUint32 = () => {
		
		if (id32 >= maxId32) {
			crypto.getRandomValues(u32s)
			id32 = 0
		}
		
		const result = u32s[id32]
		id32++
		return result
	}
	
	Reflect.defineProperty(Habitat.Random, "Uint32", {
		get: getRandomUint32,
		configurable: true,
		enumerable: true,
	})
	
	Habitat.Random.oneIn = (n) => {
		const result = getRandomUint32()
		return result % n === 0
	}
	
	Habitat.Random.maybe = (chance) => {
		return Habitat.Random.oneIn(1 / chance)
	}
	
	Habitat.Random.install = (global) => {
		global.Random = Habitat.Random
		global.oneIn = Habitat.Random.oneIn
		global.maybe = Habitat.Random.maybe
		Habitat.Random.installed = true
	}
	
}

//=======//
// Stage //
//=======//
{
	
	Habitat.Stage = {}
	Habitat.Stage.make = () => {
		
		const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
		
		const stage = {
			canvas,
			context,
			update: () => {},
			draw: () => {},
			tick: () => {
				stage.update()
				stage.draw()
				requestAnimationFrame(stage.tick)
			},
		}
		
		requestAnimationFrame(stage.tick)
		return stage
	}
	
	Habitat.Stage.install = (global) => {
		global.Stage = Habitat.Stage
		Habitat.Stage.installed = true
		
	}
	
}

//========//
// String //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(global.String.prototype, "divide", {
			value(n) {
				const regExp = RegExp(`[^]{1,${n}}`, "g")
				return this.match(regExp)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.String.prototype, "toNumber", {
			value(base) {
				return parseInt(this, base)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.String.installed = true
		
	}
	
	Habitat.String = {install}
	
}

//=======//
// Touch //
//=======//
{

	const Touches = Habitat.Touches = []
	
	const trim = (a) => {
		if (a.length == 0) return a
		let start = a.length - 1
		let end = 0
		for (let i = 0; i < a.length; i++) {
			const value = a[i]
			if (value !== undefined) {
				start = i
				break
			}
		}
		for (let i = a.length - 1; i >= 0; i--) {
			const value = a[i]
			if (value !== undefined) {
				end = i + 1
				break
			}
		}
		a.splice(end)
		a.splice(0, start)
		return a
	}
	
	Reflect.defineProperty(Touches, "install", {
		value(global) {
			
			global.Touches = Touches
			global.addEventListener("touchstart", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touches[id] === undefined) Touches[id] = {position: [undefined, undefined]}
					const touch = Touches[id]
					touch.position[0] = x
					touch.position[1] = y
				}
			})
			
			global.addEventListener("touchmove", e => {
				try {
					for (const changedTouch of e.changedTouches) {
						const x = changedTouch.clientX
						const y = changedTouch.clientY
						const id = changedTouch.identifier
						let touch = Touches[id]
						if (touch == undefined) {
							touch = {position: [undefined, undefined]}
							Touches[id] = touch
						}
						
						touch.position[0] = x
						touch.position[1] = y
					}
				}
				catch(e) {
					console.error(e)
				}
			})
			
			global.addEventListener("touchend", e => {
				for (const changedTouch of e.changedTouches) {
					const id = changedTouch.identifier
					Touches[id] = undefined
				}
				trim(Touches)
			})
			
			Reflect.defineProperty(Touches, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
	
}


//=======//
// Tween //
//=======//

{
	Habitat.Tween = {}
	
	// all from https://easings.net
	Habitat.Tween.EASE_IN_LINEAR = (t) => t
	Habitat.Tween.EASE_OUT_LINEAR = (t) => t
	Habitat.Tween.EASE_IN_OUT_LINEAR = (t) => t
	Habitat.Tween.EASE_IN_SINE = (t) => 1-Math.cos(t*Math.PI/2)
	Habitat.Tween.EASE_OUT_SINE = (t) => Math.sin(t*Math.PI/2)
	Habitat.Tween.EASE_IN_OUT_SINE = (t) => -(Math.cos(t*Math.PI)-1)/2
	Habitat.Tween.EASE_IN_POWER = (p) => (t) => Math.pow(t, p)
	Habitat.Tween.EASE_OUT_POWER = (p) => (t) => 1-Math.pow(1-t, p)
	Habitat.Tween.EASE_IN_OUT_POWER = (p) => (t) => {
		if (t < 0.5) return Math.pow(2, p-1)*Math.pow(t, p)
		return 1 - Math.pow(2 - 2*t, p)/2
	}
	Habitat.Tween.EASE_IN_EXP = Habitat.Tween.EASE_IN_EXPONENTIAL = (e) => (t) => Math.pow(2, e*t - e) * t
	Habitat.Tween.EASE_OUT_EXP = Habitat.Tween.EASE_OUT_EXPONENTIAL = (e) => (t) => 1 - Math.pow(2, -e*t) * (1-t)
	Habitat.Tween.EASE_IN_OUT_EXP = Habitat.Tween.EASE_IN_OUT_EXPONENTIAL = (e) => (t) => {
		let f;
		if (t < 0.5) f = t => Math.pow(2, 2*e*t - e)/2
		else f = t => (2 - Math.pow(2, -2*e*t + e))/2
		return f(t) * ((1-t)*f(0) + t*(f(1)-1))
	}
	Habitat.Tween.EASE_IN_CIRCULAR = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2))
	Habitat.Tween.EASE_OUT_CIRCULAR = (t) => Math.sqrt(1 - Math.pow(t - 1, 2))
	Habitat.Tween.EASE_IN_OUT_CIRCULAR = (t) => {
		if (t < 0.5) return 0.5 - Math.sqrt(1 - Math.pow(2*t, 2))/2
		return 0.5 + Math.sqrt(1 - Math.pow(-2*t + 2, 2))/2
	}
	Habitat.Tween.EASE_IN_BACK = (t) => 2.70158*t*t*t - 1.70158*t*t
	Habitat.Tween.EASE_OUT_BACK = (t) => 1 + 2.70158*Math.pow(t - 1, 3) + 1.70158*Math.pow(t - 1, 2)
	Habitat.Tween.EASE_IN_OUT_BACK = (t) => {
		if (t < 0.5) return (Math.pow(2*t, 2)*(3.59491*2*t - 2.59491))/2
		return (Math.pow(2*t-2,2)*(3.59491*(t*2-2) + 2.59491)+2)/2
	}
	Habitat.Tween.EASE_IN_ELASTIC = (t) => -Math.pow(2,10*t-10)*Math.sin((t*10-10.75)*2*Math.PI/3)
	Habitat.Tween.EASE_OUT_ELASTIC = (t) => Math.pow(2,-10*t)*Math.sin((t*10-0.75)*2*Math.PI/3)+1
	Habitat.Tween.EASE_IN_OUT_ELASTIC = (t) => {
		if (t < 0.5) return -(Math.pow(2, 20*t-10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2
		return (Math.pow(2, -20*t+10)*Math.sin((20*t-11.125)*2*Math.PI/4.5))/2+1
	}
	Habitat.Tween.EASE_OUT_BOUNCE = (t) => (t) => {
		const n1 = 7.5625
		const d1 = 2.75

		if      (t < 1 / d1)   return n1 * t * t
		else if (t < 2 / d1)   return n1 * (t -= 1.5 / d1) * t + 0.75
		else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
		else                   return n1 * (t -= 2.625 / d1) * t + 0.984375
	}
	Habitat.Tween.EASE_IN_BOUNCE = (t) => 1-Habitat.Tween.EASE_OUT_BOUNCE(1-t)
	Habitat.Tween.EASE_IN_OUT_BOUNCE = (t) => {
		if (t < 0.5) return (1-Habitat.Tween.EASE_OUT_BOUNCE(1-2*t))/2
		return (1+Habitat.Tween.EASE_OUT_BOUNCE(2*t-1))/2
	}

	Habitat.Tween.install = (global) => {
		Habitat.Tween.installed = true

		Reflect.defineProperty(global.Object.prototype, "tween", {
			value(propertyName, {to, from, over = 1000, launch = 0.5, land = 0.5, strength = 1, ease = false} = {}) {
				const before = this[propertyName]
				if (from === undefined) from = before
				if (to === undefined) to = before

				launch *= 2/3
				land = 1/3 + (1 - land) * 2/3

				const start = performance.now()

				Reflect.defineProperty(this, propertyName, {
					get() {
						const now = performance.now()

						if (now > start + over) {
							Reflect.defineProperty(this, propertyName, {
								value: to,
								writable: true,
								configurable: true,
								enumerable: true
							})
							return to
						}

						const t = (now - start) / over

						if (ease) {
							const v = ease(strength)
							if (typeof v == 'function') return v(t) * (to - from) + from
							return ease(t) * (to - from) + from
						}

						const v = 3*t*(1-t)*(1-t)*launch + 3*t*t*(1-t)*land + t*t*t
						return v * (to - from) + from

					},
					set() { },

					configurable: true,
					enumerable: true
				})
			},
			
			configurable: true,
			enumerable: false,
			writable: true
		})
	}
}


//======//
// Type //
//======//
{

	const Int = {
		check: (n) => n % 1 == 0,
		convert: (n) => parseInt(n),
	}

	const Positive = {
		check: (n) => n >= 0,
		convert: (n) => Math.abs(n),
	}

	const Negative = {
		check: (n) => n <= 0,
		convert: (n) => -Math.abs(n),
	}

	const UInt = {
		check: (n) => n % 1 == 0 && n >= 0,
		convert: (n) => Math.abs(parseInt(n)),
	}

	const UpperCase = {
		check: (s) => s == s.toUpperCase(),
		convert: (s) => s.toUpperCase(),
	}

	const LowerCase = {
		check: (s) => s == s.toLowerCase(),
		convert: (s) => s.toLowerCase(),
	}

	const WhiteSpace = {
		check: (s) => /^[ |	]*$/.test(s),
	}

	const PureObject = {
		check: (o) => o.constructor == Object,
	}

	const Primitive = {
		check: p => p.is(Number) || p.is(String) || p.is(RegExp) || p.is(Symbol),
	}
	
	const install = (global) => {
	
		global.Int = Int
		global.Positive = Positive
		global.Negative = Negative
		global.UInt = UInt
		global.UpperCase = UpperCase
		global.LowerCase = LowerCase
		global.WhiteSpace = WhiteSpace
		global.PureObject = PureObject
		global.Primitive = Primitive
	
		Reflect.defineProperty(global.Object.prototype, "is", {
			value(type) {
				if ("check" in type) {
					try { return type.check(this) }
					catch {}
				}
				try   { return this instanceof type }
				catch { return false }
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "as", {
			value(type) {
				if ("convert" in type) {
					try { return type.convert(this) }
					catch {}
				}
				return type(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Type.installed = true
		
	}
	
	Habitat.Type = {install, Int, Positive, Negative, UInt, UpperCase, LowerCase, WhiteSpace, PureObject, Primitive}
	
}

export {Habitat}
export default Habitat
export const {install} = Habitat

export const {JavaScript} = Habitat
export const {Keyboard} = Habitat
export const {Mouse} = Habitat
export const {Random} = Habitat
export const {Stage} = Habitat
export const {Touches} = Habitat
export const {Colour} = Habitat
export const {HTML} = Habitat

export const {sleep} = Habitat.Async
export const {print, dir, print9} = Habitat.Console
export const {$, $$} = Habitat.Document
export const {gcd, reduce} = Habitat.Math
export const {oneIn, maybe} = Habitat.Random
export const {Int, Positive, Negative, UInt, UpperCase, LowerCase, WhiteSpace, PureObject, Primitive} = Habitat.Type