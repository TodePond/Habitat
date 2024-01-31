import { repeatArray, shuffleArray, trimArray } from "../source/array.js"
import { assertEquals, assertNotEquals, describe, it } from "./libraries/deno-test.js"

describe("Array", () => {
	it.ignore("shuffles", () => {
		const array = [3, 2, 5]
		shuffleArray(array)
		assertNotEquals(array, [3, 2, 5])
	})

	it("trims", () => {
		const array = [undefined, undefined, 3, 2, 5, undefined, undefined]
		trimArray(array)
		assertEquals(array, [3, 2, 5])
	})

	it("repeats", () => {
		const array = [3, 2, 5]
		repeatArray(array, 2)
		assertEquals(array, [3, 2, 5, 3, 2, 5])
	})
})
