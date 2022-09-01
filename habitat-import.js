//=============//
// FROGASAURUS //
//=============//
const Frogasaurus = {}

//========//
// SOURCE //
//========//
{
	//====== ./console.js ======
	{
		Frogasaurus["./console.js"] = {}
		const print = console.log.bind(console)

		Frogasaurus["./console.js"].print = print
	}

	//====== ./greet.js ======
	{
		Frogasaurus["./greet.js"] = {}
		
		const greet = () => {
			print("world")
		}

		Frogasaurus["./greet.js"].greet = greet
	}

	const { print } = Frogasaurus["./console.js"]
}

//=========//
// EXPORTS //
//=========//
export const { print } = Frogasaurus["./console.js"]
export const { greet } = Frogasaurus["./greet.js"]

export const Habitat = {
	print: Frogasaurus["./console.js"].print,
	greet: Frogasaurus["./greet.js"].greet,
}