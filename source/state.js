import { Options } from "./options.js"
import { glue, use } from "./signal.js"

export const State = class {
	static options = {
		default: "name",
		isDefault: (v) => typeof v === "string",
		name: () => "state",
	}

	constructor(head, tail) {
		const options = new Options(State.options)(head, tail)
		Object.assign(this, options)
	}

	fire = (name) => {
		const method = this[name]
		if (method) {
			return method()
		}
	}
}

export const Machine = class {
	state = use(undefined)

	constructor(initial) {
		glue(this)
		if (initial) {
			this.set(initial)
		}
	}

	set(state) {
		if (this.state) {
			this.state.fire("exit")
		}
		this.state = state
		if (this.state === undefined) {
			return
		}
		this.state.fire("enter")
	}

	fire(name, args) {
		if (this.state === undefined) {
			return
		}

		const result = this.state.fire(name, args)
		if (result instanceof State) {
			this.set(result)
			return this.fire(name, args)
		}

		return result
	}
}
