import { Component, Entity } from "../source/entity.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Entity", () => {
	it("gets a component", () => {
		const component = new Component()
		const entity = new Entity([component])
		assertEquals(entity[component.name], component)
	})
})

describe("Component", () => {
	it("has a name", () => {
		const component = new Component()
		assertEquals(component.name, "anonymous")
	})
})

describe("Component.Transform", () => {
	it("has a position", () => {
		const component = new Component.Transform()
		assertEquals(component.position, [0, 0])
	})
})
