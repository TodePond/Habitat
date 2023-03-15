import { Component } from "../source/component.js"
import { Entity } from "../source/entity.js"
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
		assertEquals(entity[component._name], component)
	})
})

describe("Component", () => {
	it("has a name", () => {
		const component = new Component()
		assertEquals(component._name, "component")
	})
})

describe("Component.Transform", () => {
	it("has a position", () => {
		const transform = new Component.Transform()
		assertEquals([...transform.position], [0, 0])
		assertEquals(transform.position[0], 0)
		assertEquals(transform.position.x, 0)
	})
	it("uses position as a signal", () => {
		const transform = new Component.Transform()
		const x = use(() => transform.position[0])
		assertEquals(x.value, 0)
		transform.position[0] = 10
		assertEquals(x.value, 10)
	})
	it("has position glued to it", () => {
		const transform = new Component.Transform()
		assertEquals([...transform.position], [0, 0])
		transform.position = [10, 10]
		assertEquals([...transform.position], [10, 10])
	})

	it("passes down absolute position", () => {
		const parent = new Entity([new Component.Transform()])
		const child = new Entity([new Component.Transform()])
		parent.add(child)
		parent.transform.position = [10, 10]
		assertEquals([...parent.transform.absolutePosition], [10, 10])
		assertEquals([...child.transform.absolutePosition], [10, 10])
		assertEquals([...child.transform.position], [0, 0])
	})

	it("passes down absolute position to grandchildren", () => {
		const parent = new Entity([new Component.Transform()])
		const child = new Entity([new Component.Transform()])
		const grandchild = new Entity([new Component.Transform()])
		parent.add(child)
		child.add(grandchild)
		parent.transform.position = [10, 10]
		child.transform.position = [10, 10]
		assertEquals([...grandchild.transform.absolutePosition], [20, 20])
	})

	it("calculates absolute scale", () => {
		const parent = new Entity([new Component.Transform()])
		const child = new Entity([new Component.Transform()])
		parent.add(child)
		parent.transform.scale = [2, 2]
		assertEquals([...parent.transform.absoluteScale], [2, 2])
		assertEquals([...child.transform.absoluteScale], [2, 2])
		assertEquals([...child.transform.scale], [1, 1])
	})

	it("calculates absolute rotation", () => {
		const parent = new Entity([new Component.Transform()])
		const child = new Entity([new Component.Transform()])
		parent.add(child)
		parent.transform.rotation = 90
		assertEquals(parent.transform.absoluteRotation, 90)
		assertEquals(child.transform.absoluteRotation, 90)
		assertEquals(child.transform.rotation, 0)
	})
})

describe("Children", () => {
	it("has a parent signal", () => {
		const entity = new Entity()
		assertEquals(entity.parent, null)
	})
	it("can add children", () => {
		const parent = new Entity()
		const child = new Entity()
		parent.add(child)
		assertEquals(child.parent, parent)
	})
	it("can delete children", () => {
		const parent = new Entity()
		const child = new Entity()
		parent.add(child)
		parent.delete(child)
		assertEquals(child.parent, null)
	})
})
