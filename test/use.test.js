import { usePull, usePush, useSource } from "../source/use.js"
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

describe("Push", () => {
	it("has a value property", () => {
		const count = useSource(0)
		const doubled = usePush(() => count.get() * 2)
		assertEquals(doubled.value, 0)
	})

	it("has a get method", () => {
		const count = useSource(0)
		const doubled = usePush(() => count.get() * 2)
		assertEquals(doubled.get(), 0)
	})

	it("updates when its source changes", () => {
		const count = useSource(0)
		const doubled = usePush(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled.get(), 2)
	})

	it("updates recursively", () => {
		const count = useSource(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePush(() => doubled.get() * 3)
		count.set(1)
		assertEquals(tripled.get(), 6)
	})

	it("updates with multiple sources", () => {
		const time = useSource(15)
		const day = useSource("Sunday")
		const isOpen = usePush(() => day.get() !== "Sunday" && time.get() >= 10 && time.get() < 18)
		assertEquals(isOpen.get(), false)
		day.set("Monday")
		assertEquals(isOpen.get(), true)
		time.set(20)
		assertEquals(isOpen.get(), false)
		time.set(15)
		assertEquals(isOpen.get(), true)
		day.set("Sunday")
		assertEquals(isOpen.get(), false)
	})
})

describe("Pull", () => {
	it("doesn't automatically update", () => {
		const count = useSource(0)
		const doubled = usePull(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled.value, 0)
	})

	it("updates when its get method is called", () => {
		const count = useSource(0)
		const doubled = usePull(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled.get(), 2)
	})

	// TODO: this doesn't relink with sources of non-dirty pulls
	it("updates recursively", () => {
		const count = useSource(0)
		const doubled = usePull(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)
		count.set(1)
		//assertEquals(doubled.get(), 2)
		assertEquals(tripled.get(), 6)
	})

	it("doesn't update if there are no changes", () => {
		const count = useSource(0)
		let clock = 0
		const doubled = usePull(() => {
			count.get() * 2
			clock++
		})
		assertEquals(clock, 1)
		doubled.get()
		assertEquals(clock, 1)
	})
})
