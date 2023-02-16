import { LinkedList } from "./linked-list.js"

const Source = class {
	static pushStack = new LinkedList()
	static pullStack = new LinkedList()

	constructor(value) {
		this.value = value
		this.pushes = new Set()
		this.pulls = new Set()
	}

	get() {
		for (const pull of Source.pullStack) {
			this.pulls.add(pull)
			pull.sources.add(this)
		}

		const { end } = Source.pushStack
		if (end !== undefined) {
			const push = end.value
			this.pushes.add(push)
			push.sources.add(this)
		}
		return this.value
	}

	set(value) {
		this.value = value

		for (const pull of this.pulls) {
			pull.dirty = true
		}

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
		this.stack = lazy ? Source.pullStack : Source.pushStack
		this.sources = new Set()

		this.dirty = true
		this.evaluator = evaluator
		this.evaluate()
	}

	evaluate() {
		this.sources.clear()
		this.stack.push(this)
		const value = this.evaluator()
		this.stack.pop()

		this.dirty = false
		this.set(value)
	}
}

const Pull = class extends Push {
	constructor(evaluator) {
		super(evaluator, true)
	}

	get() {
		if (this.dirty) {
			this.evaluate()
		}
		return super.get()
	}
}

export const useSource = (value) => new Source(value)
export const usePush = (get) => new Push(get)
export const usePull = (get) => new Pull(get)
