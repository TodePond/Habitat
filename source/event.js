//=======//
// Event //
//=======//
{

	const install = (global) => {
	
		Reflect.defineProperty(global.EventTarget.prototype, "on", {
			get() {
				return new Proxy(this, {
					get: (element, eventName) => (...args) => element.addEventListener(eventName, ...args),
				})
			},
			set(value) {
				Reflect.defineProperty(this, "on", {value, configurable: true, writable: true, enumerable: true})
			},
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.EventTarget.prototype, "trigger", {
			value(name, options = {}) {
				const {bubbles = true, cancelable = true, ...data} = options
				const event = new Event(name, {bubbles, cancelable})
				for (const key in data) event[key] = data[key]
				this.dispatchEvent(event)
			},
		}, {configurable: true, enumerable: false, writable: true})
		
		Habitat.Event.installed = true
		
	}
	
	Habitat.Event = {install}
	
}
