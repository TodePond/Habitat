//========//
// Object //
//========//
{
	Habitat.Object = {}
	Habitat.Object.install = (global) => {
		
		// Removed because of incompatibility with Deno
		/*Reflect.defineProperty(global.Object.prototype, Symbol.iterator, {
			value: function*() {
				for (const key in this) {
					yield this[key]
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})*/
		
		Reflect.defineProperty(global.Object.prototype, "keys", {
			value: function*() {
				for (const key in this) {
					yield key
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "values", {
			value: function*() {
				for (const key in this) {
					yield this[key]
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "entries", {
			value: function*() {
				for (const key in this) {
					yield [key, this[key]]
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "map", {
			value(f) {
				const entries = Object.entries(this)
				const newEntries = entries.map(([key, value]) => [key, f(value, key)])
				const newObject = {}
				for (const [key, value] of newEntries) {
					newObject[key] = value
				}
				return newObject
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Object.installed = true
		
	}
	
}