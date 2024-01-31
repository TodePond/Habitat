import { defineGetter } from "./property.js"

export const print = console.log.bind(console)

let printCount = 0
export const print9 = (message) => {
	if (printCount > 9) return
	printCount++
	print(message)
}

export const registerDebugMethods = () => {
	defineGetter(Object.prototype, "d", function () {
		const value = this.valueOf()
		print(value)
		return value
	})

	defineGetter(Object.prototype, "d9", function () {
		const value = this.valueOf()
		print9(value)
		return value
	})
}
