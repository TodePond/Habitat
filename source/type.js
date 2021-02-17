//======//
// Type //
//======//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Object.prototype, "is", {
			value(type) {
				if ("check" in type) {
					try { return type.check(this) }
					catch {}
				}
				try   { return this instanceof type }
				catch { return false }
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "as", {
			value(type) {
				if ("convert" in type) {
					try { return type.convert(this) }
					catch {}
				}
				return type(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Type.installed = true
		
	}
	
	Habitat.Type = {install}
	
}