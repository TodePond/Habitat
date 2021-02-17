//======//
// Type //
//======//
{

	const Int = {
		check: (n) => n % 1 == 0,
		convert: (n) => parseInt(n),
	}

	const Positive = {
		check: (n) => n >= 0,
		convert: (n) => Math.abs(n),
	}

	const Negative = {
		check: (n) => n <= 0,
		convert: (n) => -Math.abs(n),
	}

	const UInt = {
		check: (n) => n % 1 == 0 && n >= 0,
		convert: (n) => Math.abs(parseInt(n)),
	}

	const UpperCase = {
		check: (s) => s == s.toUpperCase(),
		convert: (s) => s.toUpperCase(),
	}

	const LowerCase = {
		check: (s) => s == s.toLowerCase(),
		convert: (s) => s.toLowerCase(),
	}

	const WhiteSpace = {
		check: (s) => /^[ |	]*$/.test(s),
	}

	const PureObject = {
		check: (o) => o.constructor == Object,
	}

	const Primitive = {
		check: p => p.is(Number) || p.is(String) || p.is(RegExp) || p.is(Symbol),
	}
	
	const install = (global) => {
	
		global.Int = Int
		global.Positive = Positive
		global.Negative = Negative
		global.UInt = UInt
		global.UpperCase = UpperCase
		global.LowerCase = LowerCase
		global.WhiteSpace = WhiteSpace
		global.PureObject = PureObject
		global.Primitive = Primitive
	
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
	
	Habitat.Type = {install, Int, Positive, Negative, UInt, UpperCase, LowerCase, WhiteSpace, PureObject, Primitive}
	
}