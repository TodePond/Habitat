//========//
// Number //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(global.Number.prototype, "to", {
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
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		const numberToString = global.Number.prototype.toString
		Reflect.defineProperty(global.Number.prototype, "toString", {
			value(base, size) {
				if (size === undefined) return numberToString.call(this, base)
				if (size <= 0) return ""
				const string = numberToString.call(this, base)
				return string.slice(-size).padStart(size, "0")
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		const bigIntToString = global.BigInt.prototype.toString
		Reflect.defineProperty(global.BigInt.prototype, "toString", {
			value(base, size) {
				if (size === undefined) return bigIntToString.call(this, base)
				if (size <= 0) return ""
				const string = bigIntToString.call(this, base)
				return string.slice(-size).padStart(size, "0")
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Number.installed = true
		
	}
	
	Habitat.Number = {install}
	
}