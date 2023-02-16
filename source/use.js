import { LinkedList } from "./linked-list.js"

const stack = new LinkedList()

const Source = class {
	constructor(value) {
		this.value = value
		this.targets = new Set()
	}

	get() {
		const { end } = stack
		if (end !== undefined) {
			const target = end.value
			this.targets.add(target)
			target.sources.add(this)
		}
		return this.value
	}

	set(value) {
		this.value = value
		const targets = [...this.targets]
		this.targets.clear()
		for (const target of targets) {
			target.evaluate()
		}
	}
}

const Target = class extends Source {
	constructor(evaluator) {
		super()
		this.sources = new Set()
		this.evaluator = evaluator
		this.evaluate()
	}

	evaluate() {
		this.sources.clear()
		stack.push(this)
		const value = this.evaluator()
		stack.pop()

		this.set(value)
	}
}

export const useSource = (value) => new Source(value)
export const useTarget = (get) => new Target(get)
