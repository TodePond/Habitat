//========//
// Object //
//========//
{
	Habitat.Object = {}
	Habitat.Object.install = (global) => {
		
		Object.prototype[Symbol.iterator] = function*() {
			for (const key in this) {
				yield this[key]
			}
		}
		
		Habitat.Object.installed = true
		
	}
	
}