export const Options = class extends Function {
	constructor(head, tail = {}) {
		super("head", "tail = {}", "return this.parse(head, tail)")
	}

	parse(head, tail = {}) {
		return parse(this.default, this.defaults, [head, tail])
	}
}

const parse = (_default, defaults = {}, [head, tail = {}]) => {
	return {
		...defaults,

		...tail,
	}
}
