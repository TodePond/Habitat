import { registerMethods } from "../source/habitat.js"
import { use, useLazy } from "../source/signal.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Setup", () => {
	registerMethods()
})

describe("Signal", () => {
	it("stores its value", () => {
		const count = use(0)
		assertEquals(count._current, 0)
	})

	it("gets its value", () => {
		const count = use(0)
		assertEquals(count.get(), 0)
	})

	it("sets its value", () => {
		const count = use(0)
		count.set(1)
		assertEquals(count.get(), 1)
	})
})

describe("Pull", () => {
	it("stores its evaluator", () => {
		const count = useLazy(() => 0)
		assertEquals(count._evaluate(), 0)
	})

	it("doesn't initialise its value", () => {
		const count = use(0)
		const doubled = useLazy(() => count.get() * 2)
		assertEquals(doubled._current, undefined)
	})

	it("updates its value", () => {
		const count = use(0)
		const doubled = useLazy(() => count.get() * 2)
		doubled.update()
		assertEquals(doubled._current, 0)
	})

	it("updates its value when it has to", () => {
		const count = use(0)
		const doubled = useLazy(() => count.get() * 2)
		assertEquals(doubled.get(), 0)
	})

	it("doesn't update its value when it doesn't have to", () => {
		let clock = 0

		const count = use(0)
		const doubled = useLazy(() => {
			clock++
			return count.get() * 2
		})

		doubled.get()
		doubled.get()
		assertEquals(clock, 1)
	})

	it("recursively updates its value", () => {
		const count = use(0)
		const doubled = useLazy(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)
		assertEquals(tripled.get(), 0)
	})

	it("updates it value after its sources have been updated", () => {
		const count = use(0)
		const doubled = useLazy(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)
		assertEquals(doubled.get(), 0)
		assertEquals(tripled.get(), 0)
		count.set(1)
		assertEquals(tripled._current, 0)
		assertEquals(doubled._current, 0)
		assertEquals(tripled.get(), 6)
		assertEquals(doubled.get(), 2)
	})

	it("doesn't recursively update its value when it doesn't have to", () => {
		let doubleClock = 0
		let tripleClock = 0

		const count = use(0)
		const doubled = useLazy(() => {
			doubleClock++
			return count.get() * 2
		})
		const tripled = useLazy(() => {
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
	it("initialises its value", () => {
		const count = use(() => 0)
		assertEquals(count._current, 0)
	})

	it("gets its value updated", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		count.set(1)
		assertEquals(doubled._current, 2)
	})

	it("doesn't update its value when it doesn't have to", () => {
		let clock = 0

		const count = use(0)
		const doubled = use(() => {
			clock++
			return count.get() * 2
		})

		doubled.get()
		doubled.get()
		assertEquals(clock, 1)
	})

	it("recursively updates its value", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = use(() => doubled.get() * 3)
		count.set(1)
		assertEquals(tripled._current, 6)
	})

	it("unbinds its source when it isn't used", () => {
		const day = use("monday")
		const time = use("day")
		const isOpen = use(() => day.get() !== "sunday" && time.get() !== "night")

		assertEquals([...isOpen._parents], [day, time])
		assertEquals([...day._children], [isOpen])
		assertEquals([...time._children], [isOpen])

		day.set("sunday")

		assertEquals([...isOpen._parents], [day])
		assertEquals([...day._children], [isOpen])
		assertEquals([...time._children], [])
	})
})

describe("Sugar", () => {
	it("can be got with .value", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)
		assertEquals(count.value, 0)
		assertEquals(doubled.value, 0)
		assertEquals(tripled.value, 0)

		count.set(1)
		assertEquals(tripled.value, 6)
		assertEquals(doubled.value, 2)
		assertEquals(count.value, 1)
	})

	it("can be set with .value", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)

		count.value = 1
		assertEquals(tripled.value, 6)
		assertEquals(doubled.value, 2)
		assertEquals(count.value, 1)
	})

	it("can be got with .()", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)
		assertEquals(count(), 0)
		assertEquals(doubled(), 0)
		assertEquals(tripled(), 0)

		count.set(1)
		assertEquals(tripled(), 6)
		assertEquals(doubled(), 2)
		assertEquals(count(), 1)
	})

	it("can be set with .(value)", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)

		count(1)
		assertEquals(tripled(), 6)
		assertEquals(doubled(), 2)
		assertEquals(count(), 1)
	})

	it("can be iterated over", () => {
		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)

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
	it("fires when it's created", () => {
		let clock = 0
		use(() => clock++)
		assertEquals(clock, 1)
	})

	it("fires when its sources change", () => {
		const history = []
		const count = use(0)
		use(() => history.push(count.get()))
		assertEquals(history, [0])
		count.set(1)
		assertEquals(history, [0, 1])
	})

	it("recursively fires when its sources change", () => {
		const doubleHistory = []
		const tripleHistory = []

		const count = use(0)
		const doubled = use(() => count.get() * 2)
		const tripled = useLazy(() => doubled.get() * 3)

		use(() => doubleHistory.push(doubled.get()))
		use(() => tripleHistory.push(tripled.get()))

		assertEquals(doubleHistory, [0])
		assertEquals(tripleHistory, [0])

		count.set(1)

		assertEquals(doubleHistory, [0, 2])
		assertEquals(tripleHistory, [0])

		tripled.get()

		assertEquals(doubleHistory, [0, 2])
		assertEquals(tripleHistory, [0, 6])
	})

	it("can be disposed", () => {
		const history = []
		const count = use(0)
		const effect = use(() => history.push(count.get()))
		assertEquals(history, [0])
		count.set(1)
		assertEquals(history, [0, 1])
		effect.dispose()
		count.set(2)
		assertEquals(history, [0, 1])
	})
})

describe("Store", () => {
	it("gets a property", () => {
		const player = use({ count: 0 })
		assertEquals(player.count, 0)
	})

	it("sets a property", () => {
		const player = use({ count: 0 })
		player.count = 1
		assertEquals(player.count, 1)
	})

	it("gets a property recursively", () => {
		const player = use({ count: 0 })
		const doubled = use(() => player.count * 2)
		assertEquals(doubled.value, 0)
		player.count = 1
		assertEquals(doubled.value, 2)
	})

	it("works with arrays", () => {
		const position = use([0, 0])
		assertEquals(position[0], 0)
		position[0] = 10
		assertEquals(position[0], 10)
	})

	it("works with accessor arrays", () => {
		const position = use([0, 0])
		assertEquals(position[0], 0)
		position.x = 10
		assertEquals(position[0], 10)
	})

	it("works with arrays recursively", () => {
		const position = use([0, 0])
		const doubled = use(() => position[0] * 2)
		assertEquals(doubled.value, 0)
		position[0] = 10
		assertEquals(doubled.value, 20)
	})

	it("works with lazy signals", () => {
		const player = use({ count: 0 })
		const doubled = use(() => player.count * 2)
		const tripled = useLazy(() => doubled.value * 3)
		assertEquals(tripled.value, 0)
		player.count = 1
		assertEquals(tripled.value, 6)
	})

	it("can be overwritten", () => {
		const player = use({ count: 0 })
		Object.assign(player, { count: 1 })
		assertEquals(player.count, 1)
	})

	it("maintain links through overrides", () => {
		const player = use({ count: 0 })
		const doubled = use(() => player.count * 2)
		Object.assign(player, { count: 1 })
		assertEquals(doubled.value, 2)
	})

	it("garbage collects unused signals", () => {
		const player = use({ count: 0 })
		assertEquals(player.count, 0)
		Object.assign(player, { score: 1 })
		assertEquals(player.score, 1)
	})
})
