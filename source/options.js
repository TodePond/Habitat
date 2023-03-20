export const Options = class extends Function {
	constructor(head, tail = {}) {
		super("head", "tail = {}", "return this.parse(head, tail)")
		const options = parse("default", {}, [head, tail])
		Object.assign(this, options)
	}

	parse(head, tail = {}) {
		return parse(this.default, this.defaultValues, [head, tail])
	}
}

const parse = (defaultOption, getDefaultValues = {}, [head, tail = {}]) => {
	const isDefaultOption = typeof head !== "object"
	const source = isDefaultOption ? tail : head
	const options = {}

	if (typeof head !== "object") {
		options[defaultOption] = head
	}

	for (const key in getDefaultValues) {
		const value = source[key]
		options[key] = value !== undefined ? value : getDefaultValues[key]()
	}

	return options
}
