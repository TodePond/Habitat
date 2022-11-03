export const fireEvent = (name, options = {}) => {
	const {target = window, bubbles = true, cancelable = true, ...data} = options
	const event = new Event(name, {bubbles, cancelable})
	Object.assign(event, data)
	target.dispatchEvent(event)
}