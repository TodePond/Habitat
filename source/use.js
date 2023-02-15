const Use = class extends Function {
	constructor() {
		super("value", "return value === undefined? this._self._pull() : this._self._push(value)")
		const self = this.bind(this)
		self._value = undefined
		this._self = self
		return self
	}

	_pull() {
		return this._value
	}

	_push(value) {
		this._value = value
	}

	*[Symbol.iterator]() {
		yield this
		yield this
	}

	get value() {
		return this._pull()
	}

	set value(value) {
		this._push(value)
	}

	get() {
		return this._pull()
	}

	set(value) {
		this._push(value)
	}
}

const UseState = class extends Use {
	constructor(value) {
		super()
		this._push(value)
	}
}

export const _use = () => new Use()
export const useState = (value) => new UseState(value)
