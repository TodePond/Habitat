import { useState, _use } from "../source/use.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Use", () => {
	it("can be iterated over", () => {
		const count = _use()
		count._value = 0
		const [a, b] = count
		assertEquals(a, count)
		assertEquals(b, count)
	})

	it("can be pulled with .value", () => {
		const count = _use()
		count._value = 0
		assertEquals(count.value, 0)
	})

	it("can be pulled with .get()", () => {
		const count = _use()
		count._value = 0
		assertEquals(count.get(), 0)
	})

	it("can be pulled with a function call", () => {
		const count = _use()
		count._value = 0
		assertEquals(count(), 0)
	})

	it("can be pushed with .value", () => {
		const count = _use()
		count._value = 0
		assertEquals(count.value, 0)
		count.value = 1
		assertEquals(count.value, 1)
	})

	it("can be pushed with .set()", () => {
		const count = _use()
		count._value = 0
		assertEquals(count.value, 0)
		count.set(1)
		assertEquals(count.value, 1)
	})

	it("can be pushed with a function call", () => {
		const count = _use()
		count._value = 0
		assertEquals(count.value, 0)
		count(1)
		assertEquals(count.value, 1)
	})
})

describe("Use State", () => {
	it("can be initialized with a value", () => {
		const count = useState(0)
		assertEquals(count.value, 0)
	})
})
