import { useEffect, usePull, usePush, useSignal } from "../source/signal.js"
import { assertEquals, assertThrows, describe, it } from "./libraries/deno-test.js"

describe("Signal", () => {
	it("stores its value", () => {
		const count = useSignal(0)
		assertEquals(count._value, 0)
	})

	it("gets its value", () => {
		const count = useSignal(0)
		assertEquals(count.get(), 0)
	})

	it("sets its value", () => {
		const count = useSignal(0)
		count.set(1)
		assertEquals(count.get(), 1)
	})
})

describe("Pull", () => {
	it("stores its evaluator", () => {
		const count = usePull(() => 0)
		assertEquals(count.evaluate(), 0)
	})

	it("is read-only", () => {
		const count = usePull(() => 0)
		assertThrows(() => count.set(1), "Pulls are read-only")
	})

	it("doesn't initialise its value", () => {
		const count = useSignal(0)
		const doubled = usePull(() => count.get() * 2)
		assertEquals(doubled._value, undefined)
	})

	it("updates its value", () => {
		const count = useSignal(0)
		const doubled = usePull(() => count.get() * 2)
		doubled.update()
		assertEquals(doubled._value, 0)
	})

	it("updates its value when it has to", () => {
		const count = useSignal(0)
		const doubled = usePull(() => count.get() * 2)
		assertEquals(doubled.get(), 0)
	})

	it("doesn't update its value when it doesn't have to", () => {
		let clock = 0

		const count = useSignal(0)
		const doubled = usePull(() => {
			clock++
			return count.get() * 2
		})

		doubled.get()
		doubled.get()
		assertEquals(clock, 1)
	})

	it("recursively updates its value", () => {
		const count = useSignal(0)
		const doubled = usePull(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)
		assertEquals(tripled.get(), 0)
	})

	it("updates it value after its sources have been updated", () => {
		const count = useSignal(0)
		const doubled = usePull(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)
		assertEquals(doubled.get(), 0)
		assertEquals(tripled.get(), 0)
		count.set(1)
		assertEquals(tripled._value, 0)
		assertEquals(doubled._value, 0)
		assertEquals(tripled.get(), 6)
		assertEquals(doubled.get(), 2)
	})

	it("doesn't recursively update its value when it doesn't have to", () => {
		let doubleClock = 0
		let tripleClock = 0

		const count = useSignal(0)
		const doubled = usePull(() => {
			doubleClock++
			return count.get() * 2
		})
		const tripled = usePull(() => {
			tripleClock++
			return doubled.get() * 3
		})

		doubled.get()
		doubled.get()
		assertEquals(doubleClock, 1)
		assertEquals(tripleClock, 0)

		count.set(1)
		tripled.get()
		tripled.get()
		assertEquals(doubleClock, 2)
		assertEquals(tripleClock, 1)
	})
})

describe("Push", () => {
	it("is read-only", () => {
		const count = usePush(() => 0)
		assertThrows(() => count.set(1), "Pushes are read-only")
	})

	it("initialises its value", () => {
		const count = usePush(() => 0)
		assertEquals(count._value, 0)
	})

	it("gets its value updated", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled._value, 2)
	})

	it("doesn't update its value when it doesn't have to", () => {
		let clock = 0

		const count = useSignal(0)
		const doubled = usePush(() => {
			clock++
			return count.get() * 2
		})

		doubled.get()
		doubled.get()
		assertEquals(clock, 1)
	})

	it("recursively updates its value", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePush(() => doubled.get() * 3)
		count.set(1)
		assertEquals(tripled._value, 6)
	})
})

describe("Sugar", () => {
	it("can be got with .value", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)
		assertEquals(count.value, 0)
		assertEquals(doubled.value, 0)
		assertEquals(tripled.value, 0)

		count.set(1)
		assertEquals(tripled.value, 6)
		assertEquals(doubled.value, 2)
		assertEquals(count.value, 1)
	})

	it("can be set with .value", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)

		count.value = 1
		assertEquals(tripled.value, 6)
		assertEquals(doubled.value, 2)
		assertEquals(count.value, 1)
	})

	it("can be got with .()", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)
		assertEquals(count(), 0)
		assertEquals(doubled(), 0)
		assertEquals(tripled(), 0)

		count.set(1)
		assertEquals(tripled(), 6)
		assertEquals(doubled(), 2)
		assertEquals(count(), 1)
	})

	it("can be set with .(value)", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)

		count(1)
		assertEquals(tripled(), 6)
		assertEquals(doubled(), 2)
		assertEquals(count(), 1)
	})

	it("can be iterated over", () => {
		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)

		const [getCount, setCount] = count
		const [getDoubled] = doubled
		const [getTripled] = tripled

		assertEquals(getCount(), 0)
		assertEquals(getDoubled(), 0)
		assertEquals(getTripled(), 0)

		setCount(1)
		assertEquals(getTripled(), 6)
		assertEquals(getDoubled(), 2)
		assertEquals(getCount(), 1)
	})
})

describe("Effect", () => {
	it("can't be set", () => {
		const effect = useEffect(() => {})
		assertThrows(() => effect.set(0), "Effects don't have a value")
	})

	it("can't be got", () => {
		const effect = useEffect(() => {})
		assertThrows(() => effect.get(), "Effects don't have a value")
	})

	it("fires when it's created", () => {
		let clock = 0
		useEffect(() => clock++)
		assertEquals(clock, 1)
	})

	it("fires when its sources change", () => {
		const history = []
		const count = useSignal(0)
		useEffect(() => history.push(count.get()))
		assertEquals(history, [0])
		count.set(1)
		assertEquals(history, [0, 1])
	})

	it("recursively fires when its sources change", () => {
		const doubleHistory = []
		const tripleHistory = []

		const count = useSignal(0)
		const doubled = usePush(() => count.get() * 2)
		const tripled = usePull(() => doubled.get() * 3)

		useEffect(() => doubleHistory.push(doubled.get()))
		useEffect(() => tripleHistory.push(tripled.get()))

		assertEquals(doubleHistory, [0])
		assertEquals(tripleHistory, [0])

		count.set(1)

		assertEquals(doubleHistory, [0, 2])
		assertEquals(tripleHistory, [0])

		tripled.get()

		assertEquals(doubleHistory, [0, 2])
		assertEquals(tripleHistory, [0, 6])
	})
})
