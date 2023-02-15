// get()
// set(value)
// _value
// _update()
// _updateTargets()
//
// _get()

const Source = class {
	static target = null

	constructor(value) {
		this._targets = new Set()
		this._value = value
	}

	get() {
		if (Source.target !== null) {
			this._targets.add(Source.target)
			Source.target._sources.add(this)
		}
		return this._value
	}

	set(value) {
		this._value = value
		this._updateTargets()
	}

	_update() {
		throw new Error("Source is write-only")
	}

	_updateTargets() {
		for (const target of this._targets) {
			target._update()
		}
	}
}

const Target = class extends Source {
	constructor(get) {
		super()
		this._get = get
		this._sources = new Set()
		this._update()
	}

	set(value) {
		throw new Error("Target is read-only")
	}

	_update() {
		for (const source of this._sources) {
			source._targets.delete(this)
		}

		this._sources.clear()

		const oldTarget = Source.target

		Source.target = this
		this._value = this._get()
		Source.target = oldTarget

		this._updateTargets()
	}
}

export const useSource = (value) => new Source(value)
export const useTarget = (get) => new Target(get)
