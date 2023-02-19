const shared = {
	clock: 0,
	current: null,
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

		const pushes = [...this.pushes]
		for (const push of pushes) {
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
	constructor(evaluate) {
		super()
		this.birth = -Infinity
		this.evaluate = evaluate
		this.sources = new Set()
	}

	addSource(source) {
		this.sources.add(source)
	}

	update() {
		const sources = [...this.sources]
		for (const source of sources) {
			source.pushes.delete(this)
		}

		this.sources.clear()

		const previous = shared.current
		shared.current = this
		const value = this.evaluate()
		shared.current = previous

		super.set(value)
	}
}

const Pull = class extends Target {
	constructor(evaluate) {
		super()
		this.evaluate = evaluate
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
	constructor(evaluate) {
		super(evaluate)
		this.update()
	}

	set() {
		throw new Error("Pushes are read-only")
	}
}

const Effect = class extends Push {
	constructor(callback) {
		super(callback)
	}

	dispose() {
		for (const source of this.sources) {
			source.pushes.delete(this)
		}
		this.sources.clear()
	}

	set() {
		throw new Error("Effects don't have a value")
	}

	get() {
		throw new Error("Effects don't have a value")
	}
}

// const Event = class extends Signal {
// 	constructor(sources, callback) {
// 		super()
// 	}

// 	set() {
// 		throw new Error("Events don't have a value")
// 	}

// 	get() {
// 		throw new Error("Events don't have a value")
// 	}
//}

export const useSignal = (value) => new Signal(value)
export const usePull = (evaluate) => new Pull(evaluate)
export const usePush = (evaluate) => new Push(evaluate)
export const useEffect = (callback) => new Effect(callback)
//export const useEvent = (sources, callback) => new Event(sources, callback)
