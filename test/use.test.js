import { useSource, useTarget } from "../source/use.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("use", () => {
	it("should keep state", () => {
		const count = useSource(0)
		assertEquals(count.get(), 0)
		count.set(1)
		assertEquals(count.get(), 1)
	})

	it("should update targets", () => {
		const count = useSource(0)
		const doubled = useTarget(() => count.get() * 2)
		assertEquals(doubled.get(), 0)
		count.set(1)
		assertEquals(doubled.get(), 2)
	})
})
