const shared = {
	clock: 0,
	active: null,
}

export const Signal = class extends Function {
	// How the signal behaves
	dynamic = false
	lazy = false
	store = false

	// Used for managing when to update the signal
	_birth = -Infinity
	_children = new Set()
	_parents = new Set()

	// Used for storing the signal's value
	_current = undefined
	_previous = undefined
	_evaluate = function () {
		return this._current
	}

	constructor(value, options = {}) {
		//==== Sugar ====//
		super("value", "return this._self._func(value)")
		const self = this.bind(this)
		this._self = self
		Object.assign(self, this)
		self._func = (value) => {
			if (value === undefined) {
				return self.get()
			} else {
				self.set(value)
			}
		}
		//===============//

		// Apply options
		Object.assign(self, {
			dynamic: false,
			lazy: false,
			store: false,
			...options,
		})

		// Apply provided argument
		if (self.dynamic) {
			self._evaluate = value
		} else {
			self._current = value
		}

		// Initialise the signal if eager
		if (!self.lazy) {
			self.update()
		}

		return self
	}

	_addParent(parent) {
		this._parents.add(parent)

		// If we're lazy, we need to add all our ancestors too
		// so that we know what to check when we want to update
		if (this.lazy) {
			if (parent._parents === undefined) return
			for (const grandparent of parent._parents) {
				this._addParent(grandparent)
			}
		}
	}

	set(value) {
		// Update our value
		this._previous = this._current
		this._birth = shared.clock++
		this._current = value

		// Update our eager children
		const children = [...this._children]
		for (const child of children) {
			child.update()
		}
	}

	get() {
		// If we're lazy, update our value if we need to
		if (this.lazy) {
			const parents = [...this._parents]
			if (this._birth < 0 || parents.some((parent) => parent._birth > this._birth)) {
				this.update()
			}
		}

		// If there's an active signal, adopt it as a child
		// because it's using us as a dependency
		const { active } = shared
		if (active !== null) {
			active._addParent(this)
			if (active.dynamic && !active.lazy) {
				this._children.add(active)
			}
		}

		// Return our value
		return this._current
	}

	update() {
		// If we're not dynamic, just pointlessly update our value
		if (!this.dynamic) {
			this.set(this._current)
			return
		}

		// If we're dynamic, run away from our parents
		// because we might not need them this time
		const parents = [...this._parents]
		for (const parent of parents) {
			parent._children.delete(this)
		}
		this._parents.clear()

		// Keep hold of the active signal
		// It's our turn! We're the active signal now!
		// but we need to give it back afterwards
		const paused = shared.active
		shared.active = this

		// Evaluate our function
		const value = this._evaluate()

		// Give the active signal back
		shared.active = paused

		// Update our value
		this.set(value)
	}

	//==== Sugar ====//
	get value() {
		return this.get()
	}

	set value(value) {
		this.set(value)
	}

	*[Symbol.iterator]() {
		yield this
		yield this
	}
	//===============//
}

export const use = (value, options = {}) => {
	const properties = {
		dynamic: typeof value === "function",
		lazy: false,
		store: Array.isArray(value) || typeof value === "object",
		...options,
	}

	return new Signal(value, properties)
}

// Legacy
export const useSignal = use
export const usePull = (value) => use(value, { lazy: true })
export const usePush = use
export const useEffect = use
