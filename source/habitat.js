export const defineGetter = (object, name, get) => {
	return Reflect.defineProperty(object, name, {
		get,
		set(value) {
			Reflect.defineProperty(this, name, {
				value,
				configurable: true,
				writable: true,
				enumerable: true
			})
		},
		configurable: true,
		enumerable: false,
	})
}