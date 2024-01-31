export const memo = (func, getKey = JSON.stringify) => {
	const cache = new Map()
	return (...args) => {
		const key = getKey(args)
		if (cache.has(key)) {
			return cache.get(key)
		}

		const result = func(...args)
		cache.set(key, result)
		return result
	}
}
