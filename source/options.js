export const Options = class extends Function {
	constructor({ default: _default, isDefault, ...options }) {
		super("head", "tail", "return this.self.match(head, tail)")
		const self = this.bind(this)
		this.self = self
		self.options = options
		self.default = _default
		self.isDefault = isDefault
		return self
	}

	match(head, tail) {
		// If we don't have a default option, just use the first as an object
		if (this.default === undefined || this.isDefault === undefined) {
			return this.call(head)
		}

		// If the first argument doesn't match the default, use it as an object
		if (!this.isDefault(head)) {
			return this.call(head)
		}

		// Otherwise, use the first argument as the default option, and the second as an object
		return this.call({
			[this.default]: head,
			...tail,
		})
	}

	call(options = {}) {
		const result = {}
		for (const key in this.options) {
			const arg = options[key]
			const value = arg === undefined ? this.options[key]() : arg
			result[key] = value
		}
		return result
	}
}
