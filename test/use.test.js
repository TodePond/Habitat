import { useSource, useTarget } from "../source/use.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Source", () => {
	it("has a value property", () => {
		const count = useSource(0)
		assertEquals(count.value, 0)
	})

	it("has a get method", () => {
		const count = useSource(0)
		assertEquals(count.get(), 0)
	})

	it("has a set method", () => {
		const count = useSource(0)
		count.set(1)
		assertEquals(count.get(), 1)
	})
})

describe("Target", () => {
	it("has a value property", () => {
		const count = useSource(0)
		const doubled = useTarget(() => count.get() * 2)
		assertEquals(doubled.value, 0)
	})

	it("has a get method", () => {
		const count = useSource(0)
		const doubled = useTarget(() => count.get() * 2)
		assertEquals(doubled.get(), 0)
	})

	it("updates when its source changes", () => {
		const count = useSource(0)
		const doubled = useTarget(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled.get(), 2)
	})

	it("updates recursively", () => {
		const count = useSource(0)
		const doubled = useTarget(() => count.get() * 2)
		const tripled = useTarget(() => doubled.get() * 3)
		count.set(1)
		assertEquals(tripled.get(), 6)
	})
})
