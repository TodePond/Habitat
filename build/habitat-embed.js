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
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Array.prototype, "first", {
			get() {
				return this[0]
			},
			set(value) {
				Reflect.defineProperty(this, "first", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Array.prototype, "clone", {
			get() {
				return [...this]
			},
			set(value) {
				Reflect.defineProperty(this, "clone", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Array.prototype, "at", {
			value(position) {
				if (position >= 0) return this[position]
				return this[this.length + position]
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Array.prototype, "shuffle", {
			value() {
				for (let i = this.length - 1; i > 0; i--) {
					const r = Math.floor(Math.random() * (i+1))
					;[this[i], this[r]] = [this[r], this[i]]
				}
				return this
			}
		}, {configurable: true, enumerable: false, writable: true})
		
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
			}
		}, {configurable: true, enumerable: false, writable: true})
		
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
			}
		}, {configurable: true, enumerable: false, writable: true})
		
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
	}
	
	Habitat.Async = {install, sleep}
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
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Object.prototype, "dir", {
			get() {
				console.dir(this)
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "dir", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
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
			}
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Console = {install, print, dir, print9}
}

//==========//
// Function //
//==========//
{

	const install = (global) => {
		
	}
	
	Habitat.Function = {install}
	
}

//=======//
// Input //
//=======//
{

	const Keyboard = {}
	const Touches = []
	const Mouse = {
		position: [undefined, undefined],
	}
	
	const buttonMap = ["Left", "Middle", "Right", "Back", "Forward"]
	
	const filterEmpties = (a) => {
		let i = 0
		let j = 0
		while (i < a.length) {
			const v = a[i]
			if (v !== undefined) {
				if (i !== j) a[j] = v
				j++
			}
			i++
		}
		a.length = j
		return a
	}
	
	const install = (global) => {
		
		// Mouse
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
		
		// Keyboard
		global.Keyboard = Keyboard
		global.addEventListener("keydown", e => {
			Keyboard[e.key] = true
		})
		
		global.addEventListener("keyup", e => {
			Keyboard[e.key] = false
		})
		
		// Touches
		global.Touches = Touches
		global.addEventListener("touchstart", e => {
			for (const changedTouch of e.changedTouches) {
				const x = changedTouch.clientX
				const y = changedTouch.clientY
				const id = changedTouch.identifier
				if (Touches[id] === undefined) Touches[id] = [undefined, undefined]
				const touch = Touches[id]
				touch[0] = x
				touch[1] = y
			}
		})
		
		global.addEventListener("touchmove", e => {
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
		
		global.addEventListener("touchend", e => {
			for (const changedTouch of e.changedTouches) {
				const id = changedTouch.identifier
				Touches[id] = undefined
			}
			filterEmpties(Touches)
		})
		
	}
	
	Habitat.Input = {install, Mouse, Keyboard, Touches}
	
}


//======//
// Main //
//======//
Habitat.install = (global) => {
	Habitat.Array.install(global)
	Habitat.Async.install(global)
	Habitat.Console.install(global)
	Habitat.Function.install(global)
	Habitat.Input.install(global)
	Habitat.Number.install(global)
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
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Number = {install}
	
}