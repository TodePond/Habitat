import {
	add,
	angleBetween,
	crossProduct,
	distanceBetween,
	equals,
	multiply,
	rotate,
	scale,
	subtract,
} from "../source/vector.js"
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

describe("Distance Between", () => {
	it("finds the distance between two points", () => {
		const result = distanceBetween([2, 3], [2, 3])
		assertEquals(result, 0)
	})

	it("finds the distance between two numbers", () => {
		const result = distanceBetween(2, 3)
		assertEquals(result, 1)
	})
})

describe("Angle Between", () => {
	it("finds the angle between two points", () => {
		const result = angleBetween([2, 3], [2, 3])
		assertEquals(result, 0)
	})
})

describe("Rotate", () => {
	it("rotates a 2D vector", () => {
		const result = rotate([2, 3], Math.PI / 2)
		assertEquals(result, [-3, 2])
	})

	it("rotates a 2D vector around an origin", () => {
		const result = rotate([2, 3], Math.PI / 2, [1, 1])
		assertEquals(result, [-1, 2])
	})
})

describe("Equals", () => {
	it("compares two numbers", () => {
		const result = equals(2, 3)
		assertEquals(result, false)
	})

	it("compares two 2D vectors", () => {
		const result = equals([2, 3], [2, 3])
		assertEquals(result, true)
	})

	it("compares two 3D vectors", () => {
		const result = equals([2, 3, 4], [2, 3, 4])
		assertEquals(result, true)
	})
})
