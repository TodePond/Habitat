export const State = class {
	current = undefined
	children = new Set()

	constructor(name) {
		this.name = name
	}

	add(state) {
		this.children.add(state)
		this[state.name] = state
	}

	delete(state) {
		this.children.delete(state.name)
		delete this[state.name]
	}

	fire(name, event) {
		const result = this[name]?.()
		if (result !== undefined) {
			this.current = result
			return result.fire(name, event)
		}

		if (this.current !== undefined) {
			return this.current.fire(name, event)
		}
	}
}
