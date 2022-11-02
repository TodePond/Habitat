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
const Habitat = {
	shuffleArray: HabitatFrogasaurus["./array.js"].shuffleArray,
	trimArray: HabitatFrogasaurus["./array.js"].trimArray,
	repeatArray: HabitatFrogasaurus["./array.js"].repeatArray,
	sleep: HabitatFrogasaurus["./async.js"].sleep,
	print: HabitatFrogasaurus["./console.js"].print,
	print9: HabitatFrogasaurus["./console.js"].print9,
	registerDebugMethods: HabitatFrogasaurus["./console.js"].registerDebugMethods,
	defineGetter: HabitatFrogasaurus["./habitat.js"].defineGetter,
}