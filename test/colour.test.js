import { Colour, Splash } from "../source/colour.js"
import { assertArrayIncludes, assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Colour", () => {
	it("makes an array", () => {
		const colour = new Colour(255, 128, 222, 255)
		assertArrayIncludes(colour, [255, 128, 222, 255])
	})

	it("makes a hexcode", () => {
		const colour = new Colour(255, 128, 222)
		assertEquals(colour.toString(), "#ff80deff")
	})
})

describe("Splash", () => {
	it("makes a splash", () => {
		const splash = new Splash(937)
		assertArrayIncludes(splash, [255, 128, 222, 255])
	})
})
