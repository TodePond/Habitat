const shared = {
	clock: 0,
	active: null,
}

// The underlying signal class
const _Signal = class {
	_view = undefined

	// How the signal behaves
	dynamic = false
	lazy = false
	store = false

	// Used for managing when to update the signal
	_birth = -Infinity
	_children = new Set()
	_parents = new Set()
	_properties = new Map()

	// Used for storing the signal's value
	_current = undefined
	_previous = undefined
	_evaluate = function () {
		return this._current
	}

	constructor(view, value, options = {}) {
		// Apply options
		Object.assign(this, {
			dynamic: false,
			lazy: false,
			store: false,
			...options,
		})

		this._view = view

		// Initialise our value
		if (this.dynamic) {
			this._evaluate = value
		} else {
			this._current = value
		}

		// Initialise the signal if eager
		if (!this.lazy) {
			this.update()
		}

		return this
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
		// If we're a store, update our properties
		if (this.store) {
			// Add new properties
			for (const key in value) {
				if (this._properties.has(key)) continue
				const property = use(value[key])
				this._properties.set(key, property)
				property.glueTo(this._view, key)
			}

			// Update existing properties
			for (const [key, property] of this._properties) {
				if (key in value) {
					property.set(value[key])
				} else {
					property.dispose()
					this._properties.delete(key)
					Reflect.deleteProperty(this._view, key)
				}
			}
		}

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

	dispose() {
		// Remove ourselves from our parents
		const parents = [...this._parents]
		for (const parent of parents) {
			parent._children.delete(this)
		}
		this._parents.clear()

		// Remove ourselves from our children
		const children = [...this._children]
		for (const child of children) {
			child._parents.delete(this)
		}
		this._children.clear()

		// Remove properties
		const properties = [...this._properties]
		for (const [, property] of properties) {
			property.dispose()
		}
		this._properties.clear()

		this._children.clear()
	}

	glueTo(object, key) {
		if (this.store) {
			Reflect.defineProperty(object, key, {
				get: () => this._view,
				set: (value) => this.set(value),
				enumerable: true,
				configurable: true,
			})
			return
		}

		Reflect.defineProperty(object, key, {
			get: () => this.get(),
			set: (value) => this.set(value),
			enumerable: true,
			configurable: true,
		})
	}

	*[Symbol.iterator]() {
		if (this.store) {
			if (this._view instanceof ArraySignal) {
				for (const [key] of this._properties) {
					yield this._view[key]
				}
			} else {
				for (const [key] of this._properties) {
					yield this._view[key]
				}
			}
			return
		}

		yield this._view
		yield (value) => this._view.set(value)
	}
}

// The signal view class that provides extra sugar
export const FunctionSignal = class extends Function {
	constructor(value, options = {}) {
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

		const signal = new _Signal(self, value, options)
		Reflect.defineProperty(self, "_isSignal", { value: true })
		Reflect.defineProperty(self, "_signal", { value: signal })
		return self
	}

	_addParent(parent) {
		return this._signal._addParent(parent)
	}

	set(value) {
		return this._signal.set(value)
	}

	get() {
		return this._signal.get()
	}

	glueTo(object, key) {
		return this._signal.glueTo(object, key)
	}

	update() {
		return this._signal.update()
	}

	dispose() {
		return this._signal.dispose()
	}

	get value() {
		return this.get()
	}

	set value(value) {
		this.set(value)
	}

	*[Symbol.iterator]() {
		for (const value of this._signal) {
			yield value
		}
	}
}

export const ArraySignal = class extends Array {
	constructor(value, options = {}) {
		super()
		const signal = new _Signal(this, value, options)
		Reflect.defineProperty(this, "_isSignal", { value: true })
		Reflect.defineProperty(this, "_signal", { value: signal })
		return this
	}

	_addParent(parent) {
		return this._signal._addParent(parent)
	}

	set(value) {
		this._signal.set(value)
	}

	get() {
		return this._signal.get()
	}

	glueTo(object, key) {
		return this._signal.glueTo(object, key)
	}

	update() {
		return this._signal.update()
	}

	dispose() {
		return this._signal.dispose()
	}

	get value() {
		return this.get()
	}

	set value(value) {
		this.set(value)
	}

	*[Symbol.iterator]() {
		for (const [key] of this._signal._properties) {
			yield this[key]
		}
	}
}

export const use = (value, options = {}) => {
	const properties = {
		dynamic: typeof value === "function",
		lazy: false,
		store: Array.isArray(value) || typeof value === "object",
		...options,
	}

	if (properties.store && Array.isArray(value)) {
		return new ArraySignal(value, properties)
	}

	return new FunctionSignal(value, properties)
}

use.glue = (object) => {
	for (const key in object) {
		const value = object[key]
		if (value._isSignal) {
			value.glueTo(object, key)
		}
	}
}

// Legacy
export const useLazy = (value) => use(value, { lazy: true })
