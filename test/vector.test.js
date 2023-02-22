import { add, crossProduct, multiply, scale, subtract } from "../source/vector.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Scale", () => {
	it("scales a number", () => {
		const result = scale(2, 3)
		assertEquals(result, 6)
	})

	it("scales a 2D vector", () => {
		const result = scale([2, 3], 3)
		assertEquals(result, [6, 9])
	})
})

describe("Multiply", () => {
	it("multiplies two numbers", () => {
		const result = multiply(2, 3)
		assertEquals(result, 6)
	})

	it("multiplies a number by a 2D vector", () => {
		const result = multiply(2, [2, 3])
		assertEquals(result, [4, 6])
	})

	it("multiplies a 2D vector by a number", () => {
		const result = multiply([2, 3], 2)
		assertEquals(result, [4, 6])
	})
})

describe("Add", () => {
	it("adds two numbers", () => {
		const result = add(2, 3)
		assertEquals(result, 5)
	})

	it("adds two vectors", () => {
		const result = add([2, 3], [2, 3])
		assertEquals(result, [4, 6])
	})
})

describe("Subtract", () => {
	it("subtracts two numbers", () => {
		const result = subtract(2, 3)
		assertEquals(result, -1)
	})

	it("subtracts two 2D vectors", () => {
		const result = subtract([2, 3], [2, 3])
		assertEquals(result, [0, 0])
	})
})

describe("Cross Product", () => {
	it("crosses two 2D vectors", () => {
		const result = crossProduct([2, 3], [2, 3])
		assertEquals(result, 0)
	})

	it("crosses two 3D vectors", () => {
		const result = crossProduct([2, 3, 4], [2, 3, 4])
		assertEquals(result, [0, 0, 0])
	})
})
