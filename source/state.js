import { Options } from "./options.js"

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
	current = undefined

	constructor(initial) {
		if (initial) {
			this.set(initial)
		}
	}

	set(state) {
		if (this.current) {
			this.current.fire("exit")
		}
		this.current = state
		if (this.current === undefined) {
			return
		}
		this.current.fire("enter")
	}

	fire(name, args) {
		if (this.current === undefined) {
			return
		}

		const result = this.current.fire(name, args)
		if (result instanceof State) {
			this.set(result)
			return this.fire(name, args)
		}

		return result
	}
}
