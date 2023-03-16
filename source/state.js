export const State = class {
	root = this
	current = this
	parent = undefined
	children = new Map()

	constructor(name) {
		this.name = name
	}

	add(state) {
		if (state.parent !== undefined) {
			state.parent.delete(state)
		}
		state.parent = this
		state.root = this.root
		this.children.set(state.name, state)
		this[state.name] = state
	}

	delete(state) {
		this.children.delete(state.name)
		delete this[state.name]
		state.parent = undefined
		state.root = state
	}

	transition(state) {
		if (this.root !== this) {
			return this.root.transition(state)
		}
	}

	fire(name, event) {
		this[name]?.()
		if (this.current) {
			this.current.fire(name, event)
		}
	}
}
