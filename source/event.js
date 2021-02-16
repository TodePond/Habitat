//=======//
// Event //
//=======//
{

	const install = (global) => {
	
		Reflect.defineProperty(global.EventTarget.prototype, "on", {
			get() {
				return new Proxy(this, {
					get: (element, eventName, callback) => (...args) => element.addEventListener(eventName, ...args),
				})
			},
			set(value) {
				Reflect.defineProperty(this, "on", {value, configurable: true, writable: true, enumerable: true})
			},
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.EventTarget.prototype, "trigger", {
			value() {
				
			},
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Event = {install}
	
}
