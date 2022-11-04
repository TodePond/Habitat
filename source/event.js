export const fireEvent = (name, options = {}) => {
	const {target = window, bubbles = true, cancelable = true, ...data} = options
	const event = new Event(name, {bubbles, cancelable})
	for (const key in data) {
		event[key] = data[key]
	}
	target.dispatchEvent(event)
}

export const on = (event, func, options) => {
	return addEventListener(event, func, options)
}