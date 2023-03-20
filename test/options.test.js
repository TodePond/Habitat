import { Options } from "../source/options.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Options", () => {
	it("should assign defaults", () => {
		const options = new Options({
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.defaults.score(), 0)
		assertEquals(options.defaults.health(), 10)
	})

	it("should assign a default default", () => {
		const options = new Options({
			default: "health",
			score: () => 0,
			health: () => 10,
		})

		assertEquals(options.default, "health")
		assertEquals(options.defaults.score(), 0)
		assertEquals(options.defaults.health(), 10)
	})
})
