//=============//
// Main Header //
//=============//
const Habitat = {}

//=========//
// Console //
//=========//
{
	const print = console.log.bind(console)
	
	let print9Counter = 0
	const print9 = (message) => {
		if (print9Counter >= 9) return
		print9Counter++
		console.log(message)
	}
	
	const install = (global) => {
		global.print = print
		global.print9 = print9
		
		Reflect.defineProperty(Object.prototype, "d", {
			get() {
				console.log(this.valueOf())
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "d", {value})
			}
		}, {configurable: true})
	}
	
	Habitat.Console = {install, print, print9}
}

//======//
// Main //
//======//
Habitat.install = (global) => {
	Habitat.Console.install(global)
}

//================//
// Console Footer //
//================//
export const {install, print, print9} = Habitat.Console

//====================//
// Main Module Footer //
//====================//
export {Habitat}
export default Habitat
export const {install} = Habitat