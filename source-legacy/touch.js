//=======//
// Touch //
//=======//
{

	const Touches = Habitat.Touches = []
	
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
	
	Reflect.defineProperty(Touches, "install", {
		value(global) {
			
			global.Touches = Touches
			global.addEventListener("touchstart", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touches[id] === undefined) Touches[id] = {position: [undefined, undefined]}
					const touch = Touches[id]
					touch.position[0] = x
					touch.position[1] = y
				}
			})
			
			global.addEventListener("touchmove", e => {
				try {
					for (const changedTouch of e.changedTouches) {
						const x = changedTouch.clientX
						const y = changedTouch.clientY
						const id = changedTouch.identifier
						let touch = Touches[id]
						if (touch == undefined) {
							touch = {position: [undefined, undefined]}
							Touches[id] = touch
						}
						
						touch.position[0] = x
						touch.position[1] = y
					}
				}
				catch(e) {
					console.error(e)
				}
			})
			
			global.addEventListener("touchend", e => {
				for (const changedTouch of e.changedTouches) {
					const id = changedTouch.identifier
					Touches[id] = undefined
				}
				trim(Touches)
			})
			
			Reflect.defineProperty(Touches, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
	
}
