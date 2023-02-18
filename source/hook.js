const shared = {
	clock: 0,
	current: null,
	pull: null,
	push: null,
}

const Signal = class extends Function {
	constructor(value) {
		//==== Sugar ====//
		super("value", "return value === undefined? this.self.get() : this.self.set(value)")
		const self = this.bind(this)
		this.self = self
		//===============//

		self._value = value
		self.birth = shared.clock++
		self.pushes = new Set()
		return self
	}

	set(value) {
		this.birth = shared.clock++
		this._value = value

		for (const push of this.pushes) {
			push.update()
		}
	}

	get() {
		const { current } = shared
		if (current !== null) {
			current.addSource(this)

			if (current instanceof Push) {
				this.addPush(current)
			}
		}
		return this._value
	}

	addPush(push) {
		this.pushes.add(push)
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

const Target = class extends Signal {
	constructor(evaluator) {
		super()
		this.birth = -Infinity
		this.evaluator = evaluator
		this.sources = new Set()
	}

	addSource(source) {
		this.sources.add(source)
	}

	update() {
		this.sources.clear()

		const previous = shared.current
		shared.current = this
		const value = this.evaluator()
		shared.current = previous

		super.set(value)
	}
}

const Pull = class extends Target {
	constructor(evaluator) {
		super()
		this.evaluator = evaluator
		this.sources = new Set()
		this.birth = -Infinity
	}

	addSource(source) {
		this.sources.add(source)
		if (source.sources === undefined) return
		for (const sourceSource of source.sources) {
			this.addSource(sourceSource)
		}
	}

	get() {
		const sources = [...this.sources]
		if (this.birth < 0 || sources.some((source) => source.birth > this.birth)) {
			this.update()
		}

		return super.get()
	}

	set() {
		throw new Error("Pulls are read-only")
	}
}

const Push = class extends Target {
	constructor(evaluator) {
		super(evaluator)
		this.update()
	}

	set() {
		throw new Error("Pushes are read-only")
	}
}

export const useSignal = (value) => new Signal(value)
export const usePull = (evaluator) => new Pull(evaluator)
export const usePush = (evaluator) => new Push(evaluator)
