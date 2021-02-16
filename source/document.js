//==========//
// Document //
//==========//
{

	const $ = (...args) => document.querySelector(...args)
	const $$ = (...args) => document.querySelectorAll(...args)

	const install = (global) => {
	
		if (global.Element === undefined) return
	
		global.$ = $
		global.$$ = $$
		
		Reflect.defineProperty(global.Element.prototype, "$", {
			value: global.Element.prototype.querySelector,
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Element.prototype, "$$", {
			value: global.Element.prototype.querySelectorAll,
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Document = {install, $, $$}
	
}
