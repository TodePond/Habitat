//=============//
// FROGASAURUS //
//=============//
const HabitatFrogasaurus = {}

//========//
// SOURCE //
//========//
{
	//====== ./console.js ======
	{
		HabitatFrogasaurus["./console.js"] = {}
		
		const print = console.log.bind(console)
		
		let printCount = 0
		const print9 = (message) => {
			if (printCount  > 9) return
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

	const { defineGetter } = HabitatFrogasaurus["./habitat.js"]

}

//=========//
// EXPORTS //
//=========//
export const { print, print9, registerDebugMethods } = HabitatFrogasaurus["./console.js"]
export const { defineGetter } = HabitatFrogasaurus["./habitat.js"]

export const Habitat = {
	print: HabitatFrogasaurus["./console.js"].print,
	print9: HabitatFrogasaurus["./console.js"].print9,
	registerDebugMethods: HabitatFrogasaurus["./console.js"].registerDebugMethods,
	defineGetter: HabitatFrogasaurus["./habitat.js"].defineGetter,
}