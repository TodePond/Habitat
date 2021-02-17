//=======//
// Touch //
//=======//
{

	const Touch = Habitat.Touch = []
	
	const trim = (a) => {
		if (a.length == 0) return a
		let start = a.length - 1
		let end = 0
		for (let i = 0; i < a.length; i++) {
			const value = a[i]
			if (value !== undefined) {
				start = i
				break
			}
		}
		for (let i = a.length - 1; i >= 0; i--) {
			const value = a[i]
			if (value !== undefined) {
				end = i + 1
				break
			}
		}
		a.splice(end)
		a.splice(0, start)
		return a
	}
	
	Reflect.defineProperty(Touch, "install", {
		value(global) {
			
			global.Touch = Touch
			global.addEventListener("touchstart", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touch[id] === undefined) Touch[id] = [undefined, undefined]
					const touch = Touch[id]
					touch[0] = x
					touch[1] = y
				}
			})
			
			global.addEventListener("touchmove", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touch[id] === undefined) Touch[id] = {position: [undefined, undefined]}
					const touch = Touch[id]
					touch.position[0] = x
					touch.position[1] = y
				}
			})
			
			global.addEventListener("touchend", e => {
				for (const changedTouch of e.changedTouches) {
					const id = changedTouch.identifier
					Touch[id] = undefined
				}
				trim(Touch)
			})
			
			
			Reflect.defineProperty(Touch, "installed", {
				value: true,
			}, {configurable: true, enumerable: false, writable: true})
		}
	}, {configurable: true, enumerable: false, writable: true})
	
	
}
