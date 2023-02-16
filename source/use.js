import { LinkedList } from "./linked-list.js"

const Source = class {
	static clock = 0
	static stack = new LinkedList()

	constructor(value) {
		this.value = value
		this.pushes = new Set()
		this.birth = Source.clock++
	}

	get() {
		const { end } = Source.stack
		if (end !== undefined) {
			const target = end.value
			if (!target.lazy) {
				this.pushes.add(target)
			}
			target.sources.add(this)
		}
		return this.value
	}

	set(value) {
		this.value = value
		this.birth = Source.clock++
		const pushes = [...this.pushes]
		this.pushes.clear()
		for (const push of pushes) {
			push.evaluate()
		}
	}
}

const Push = class extends Source {
	constructor(evaluator, lazy = false) {
		super()
		this.lazy = lazy
		this.sources = new Set()
		this.evaluator = evaluator
		this.evaluate()
	}

	evaluate() {
		this.sources.clear()
		Source.stack.push(this)
		const value = this.evaluator()
		Source.stack.pop()

		this.set(value)
	}
}

const Pull = class extends Push {
	constructor(evaluator) {
		super(evaluator, true)
	}

	get() {
		for (const source of this.sources) {
			if (source.birth > this.birth) {
				this.evaluate()
				break
			}
		}
		return super.get()
	}
}

export const useSource = (value) => new Source(value)
export const usePush = (get) => new Push(get)
export const usePull = (get) => new Pull(get)
