//======//
// Type //
//======//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Object.prototype, "is", {
			value(type) {
				if ("check" in type) {
					try { return type.check(this) }
					catch {
						try   { return this instanceof type }
						catch { return false }
					}
				}
				try   { return this instanceof type }
				catch { return false }
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Type.installed = true
		
	}
	
	Int = {
		check: (n) => n % 1 == 0,
		convert: (n) => parseInt(n),
	}
	
	Habitat.Type = {install}
	
}