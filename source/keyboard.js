//==========//
// Keyboard //
//==========//
{
	
	const install = (global) => {
		
		global.addEventListener("keydown", e => {
			Habitat.Keyboard[e.key] = true
		})
		
		global.addEventListener("keyup", e => {
			Habitat.Keyboard[e.key] = false
		})
		
		global.Keyboard = Habitat.Keyboard
		
	}
	
	Habitat.Keyboard = {install}
	
}