import { Component, Entity } from "../source/entity.js"
import { registerMethods } from "../source/habitat.js"
import { use } from "../source/signal.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Setup", () => {
	registerMethods()
})

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
	return
	it("has a position", () => {
		const transform = new Component.Transform()
		assertEquals([...transform.position], [0, 0])
		assertEquals(transform.position[0], 0)
		assertEquals(transform.position.x, 0)
	})
	return
	it("uses position as a signal", () => {
		const transform = new Component.Transform()
		const x = use(() => transform.position[0])
		assertEquals(x.value, 0)
		transform.position[0] = 10
		assertEquals(x.value, 10)
	})
	return
	it("has position glued to it", () => {
		const transform = new Component.Transform()
		const x = use(() => transform.position[0])
		assertEquals(x.value, 0)
		transform.position = [10, 10]
		assertEquals(x.value, 10)
	})
})
