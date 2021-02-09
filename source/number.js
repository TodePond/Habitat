//========//
// Number //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(Number.prototype, "to", {
			value: function* (v) {
				let i = this.valueOf()
				if (i <= v) {
					while (i <= v) {
						yield i
						i++
					}
				}
				else {
					while (i >= v) {
						yield i
						i--
					}
				}
			},
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Number = {install}
	
}