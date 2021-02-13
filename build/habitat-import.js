const Habitat = {}

//=======//
// Array //
//=======//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(Array.prototype, "last", {
			get() {
				return this[this.length-1]
			},
			set(value) {
				Reflect.defineProperty(this, "last", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Array.prototype, "first", {
			get() {
				return this[0]
			},
			set(value) {
				Reflect.defineProperty(this, "first", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Array.prototype, "clone", {
			get() {
				return [...this]
			},
			set(value) {
				Reflect.defineProperty(this, "clone", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Array.prototype, "at", {
			value(position) {
				if (position >= 0) return this[position]
				return this[this.length + position]
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Array.prototype, "shuffle", {
			value() {
				for (let i = this.length - 1; i > 0; i--) {
					const r = Math.floor(Math.random() * (i+1))
					;[this[i], this[r]] = [this[r], this[i]]
				}
				return this
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Array.prototype, "trim", {
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
		
		Reflect.defineProperty(Array.prototype, "repeat", {
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
		
		Reflect.defineProperty(Object.prototype, "d", {
			get() {
				const value = this.valueOf()
				console.log(value)
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(Object.prototype, "dir", {
			get() {
				console.dir(this)
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "dir", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true, enumerable: false, writable: true})
		
		let d9Counter = 0
		Reflect.defineProperty(Object.prototype, "d9", {
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

//======//
// Main //
//======//
Habitat.install = (global) => {
	Habitat.Array.install(global)
	//Habitat.Async.install(global)
	Habitat.Console.install(global)
	Habitat.Number.install(global)
}

//========//
// Number //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(Number.prototype, "to", {
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



export const {print, dir, print9} = Habitat.Console

export {Habitat}
export default Habitat
export const {install} = Habitat