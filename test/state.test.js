import { Machine, State } from "../source/state.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("State", () => {
	it("gets made and named", () => {
		const state = new State()
		assertEquals(state.name, "state")
	})

	it("sets a machine", () => {
		const state = new State()
		const machine = new Machine()
		machine.set(state)
		assertEquals(machine.state, state)
	})

	it("fires enter and exit", () => {
		let enterClock = 0
		let exitClock = 0
		const state = new State({
			enter: () => enterClock++,
			exit: () => exitClock++,
		})
		const machine = new Machine()
		assertEquals(enterClock, 0)
		assertEquals(exitClock, 0)
		machine.set(state)
		assertEquals(enterClock, 1)
		assertEquals(exitClock, 0)
		machine.set()
		assertEquals(enterClock, 1)
		assertEquals(exitClock, 1)
	})

	it("fires events", () => {
		const state = new State({
			ping: () => "pong",
		})
		const machine = new Machine()
		machine.set(state)
		assertEquals(machine.fire("ping"), "pong")
	})
})
