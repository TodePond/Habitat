export const State = class {
	parent = undefined
	child = undefined

	transition(state) {}

	fireDown(name, args) {}

	fire(name, args) {
		// Fire my method
		const method = this[name]
		if (method === undefined) return
		const result = method.apply(this, args)

		// If I don't have a parent, we can't transition
		// so just return the result
		if (this.parent === undefined) {
			return result
		}

		// If I have a parent, transition if the result is a state
	}
}
