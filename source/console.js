import { defineGetter } from "./habitat.js"

export const print = console.log.bind(console)

let printCount = 0
export const print9 = (message) => {
	if (printCount  > 9) return
	printCount++
	print(message)
}

export const registerDebug = (global) => {
	
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