const shared = {
	clock: 0,
	active: null,
}

// The underlying signal class
const Signal = class extends Function {
	constructor(value, options = {}) {
		super("value", "return this._self._func(value)")
		const self = this.bind(this)
		this.setInternalProperty("_self", self)
		Object.assign(self, this)
		self.setInternalProperty("_func", (value) => {
			if (value === undefined) {
				return self.get()
			} else {
				self.set(value)
			}
		})

		self.setInternalProperty("_isSignal", true)
		self.setInternalProperty("dynamic", false)
		self.setInternalProperty("lazy", false)
		self.setInternalProperty("store", false)
		self.setInternalProperty("_birth", -Infinity)
		self.setInternalProperty("_children", new Set())
		self.setInternalProperty("_parents", new Set())
		self.setInternalProperty("_properties", new Map())
		self.setInternalProperty("_store", undefined)
		self.setInternalProperty("_current", undefined)
		self.setInternalProperty("_previous", undefined)
		self.setInternalProperty("_evaluate", () => self._current)
		Reflect.defineProperty(self, "length", {
			get: () => {
				if (Array.isArray(self._current)) {
					return self._current.length
				}

				return 1
			},
		})

		// Apply options
		Object.assign(self, {
			dynamic: false,
			lazy: false,
			store: false,
			...options,
		})

		// Initialise our value
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

	setInternalProperty(key, value) {
		Reflect.defineProperty(this, key, {
			value,
			writable: true,
		})
	}

	set(value) {
		// If we're a store, update our properties
		if (this.store) {
			// Add new properties
			for (const key in value) {
				if (this._properties.has(key)) continue
				const property = use(value[key], { lazy: this.lazy })
				property._store = use(() => {
					this._current[key] = property.get()
				})
				this._properties.set(key, property)
				property.glueTo(this, key)
			}

			// Update existing properties
			for (const [key, property] of this._properties) {
				if (key in value) {
					property.set(value[key])
				} else {
					property.dispose()
					this._properties.delete(key)
					Reflect.deleteProperty(this, key)
				}
			}
		}

		// Update our value
		this._previous = this._current
		this._birth = shared.clock++
		if (!this.store) {
			this._current = value
		}

		// Update our eager children
		const children = [...this._children]
		for (const child of children) {
			child.update()
		}
	}

	_isDirty() {
		if (!this.lazy) {
			return false
		}

		if (this._birth < 0) {
			return true
		}

		for (const parent of this._parents) {
			if (parent._birth > this._birth) {
				return true
			}
		}

		return false
	}

	get() {
		// If our value is out-of-date, update our value
		if (this._isDirty()) {
			this.update()
		}

		// If there's an active signal, adopt it as a child
		// because it's using us as a dependency
		const { active } = shared
		if (active !== null) {
			if (!this.dynamic) {
				active._parents.add(this)
			} else {
				for (const parent of this._parents) {
					active._parents.add(parent)
				}
			}
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
		if (!this.lazy) {
			for (const parent of this._parents) {
				parent._children.delete(this)
			}
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

		if (this._store !== undefined) {
			this._store.dispose()
		}

		this._children.clear()
	}

	glueTo(object, key) {
		if (this.store) {
			Reflect.defineProperty(object, key, {
				get: () => this,
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

	get value() {
		return this.get()
	}

	set value(value) {
		this.set(value)
	}

	*[Symbol.iterator]() {
		if (this.store) {
			if (Array.isArray(this._current)) {
				for (const [key] of this._properties) {
					yield this[key]
				}
			} else {
				for (const [key] of this._properties) {
					yield [key, this[key]]
				}
			}
			return
		}

		yield this
		yield (value) => this.set(value)
	}

	[Symbol.toPrimitive](hint) {
		if (hint === "string") {
			return this.get().toString()
		}
		return this.get()
	}

	valueOf() {
		return this.get()
	}

	toString() {
		return this.get().toString()
	}
}

export const ArrayView = class extends Array {
	constructor(signal) {
		if (typeof signal === "number") {
			return new Array(signal)
		}
		super()
		Reflect.defineProperty(this, "_isSignal", { value: true })
		Reflect.defineProperty(this, "_signal", { value: signal })
		for (const [key, property] of signal._properties) {
			Reflect.defineProperty(this, key, {
				get: () => property.get(),
				set: (value) => property.set(value),
			})
		}
	}

	dispose() {
		this._signal.dispose()
	}

	set(value) {
		this._signal.set(value)
	}

	get() {
		return this._signal.get()
	}

	update() {
		this._signal.update()
	}

	get value() {
		return this._signal.get()
	}

	set value(value) {
		this._signal.value = value
	}

	glueTo(object, key) {
		Reflect.defineProperty(object, key, {
			get: () => this,
			set: (value) => this.set(value),
			enumerable: true,
			configurable: true,
		})
		return
	}
}

export const use = (value, options = {}) => {
	const properties = {
		dynamic: typeof value === "function",
		lazy: false,
		store: Array.isArray(value) || value?.constructor === Object,
		...options,
	}

	const signal = new Signal(value, properties)
	if (Array.isArray(value) && properties.store) {
		return new ArrayView(signal)
	}
	return signal
}

export const snuse = (value, options = {}) => {
	return use(value, { lazy: true, ...options })
}

export const glue = (source, target = source) => {
	for (const key in source) {
		const value = source[key]
		if (value?._isSignal) {
			value.glueTo(target, key)
		}
	}
}
