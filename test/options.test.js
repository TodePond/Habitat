import { Options } from "../source/options.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Options", () => {
	it("assigns its properties", () => {
		const options = new Options({
			default: "health",
			isDefault: (v) => typeof v === "number",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.options.score instanceof Function, true)
		assertEquals(options.options.health instanceof Function, true)
		assertEquals(options.default, "health")
		assertEquals(options.isDefault instanceof Function, true)
	})

	it("matches the default option", () => {
		const options = new Options({
			default: "health",
			isDefault: (v) => typeof v === "number",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.match(10), { health: 10, score: 0 })
		assertEquals(options.match(10, { score: 5 }), { health: 10, score: 5 })
	})

	it("matches an object", () => {
		const options = new Options({
			default: "health",
			isDefault: (v) => typeof v === "number",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.match({ health: 5 }), { health: 5, score: 0 })
		assertEquals(options.match({ health: 5, score: 10 }), { health: 5, score: 10 })
	})

	it("matches an empty argument", () => {
		const options = new Options({
			default: "health",
			isDefault: (v) => typeof v === "number",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.match(), { health: 10, score: 0 })
	})

	it("can be used as a function", () => {
		const options = new Options({
			default: "health",
			isDefault: (v) => typeof v === "number",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options(10), { health: 10, score: 0 })
		assertEquals(options(10, { score: 5 }), { health: 10, score: 5 })
		assertEquals(options({ health: 5 }), { health: 5, score: 0 })
		assertEquals(options({ health: 5, score: 10 }), { health: 5, score: 10 })
		assertEquals(options(), { health: 10, score: 0 })
	})
})
