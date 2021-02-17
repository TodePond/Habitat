//======//
// Math //
//======//
{
	
	const gcd = (...numbers) => {
		const [head, ...tail] = numbers
		if (numbers.length === 1) return head
		if (numbers.length  >  2) return gcd(head, gcd(...tail))
		
		let [a, b] = [head, ...tail]
		
		while (true) {
			if (b === 0) return a
			a = a % b
			if (a === 0) return b
			b = b % a
		}
		
	}
	
	const reduce = (...numbers) => {
		const divisor = gcd(...numbers)
		return numbers.map(n => n / divisor)
	}
	
	const install = (global) => {
		global.Math.gcd = Habitat.Math.gcd
		global.Math.reduce = Habitat.Math.reduce
		Habitat.Math.installed = true
	}
	
	
	Habitat.Math = {install, gcd, reduce}
	
}
