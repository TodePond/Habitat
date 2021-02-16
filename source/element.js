//=========//
// Element //
//=========//
{

	const $ = document.querySelector.bind(document)
	const $$ = document.querySelectorAll.bind(document)

	const install = (global) => {
	
		global.$ = $
		global.$$ = $$
		
		Reflect.defineProperty(global.Element.prototype, "$", {
			value: global.Element.prototype.querySelector,
		}, {configurable: true, enumerable: false, writable: true})
		
		Reflect.defineProperty(global.Element.prototype, "$$", {
			value: global.Element.prototype.querySelectorAll,
		}, {configurable: true, enumerable: false, writable: true})
		
	}
	
	Habitat.Element = {install, $, $$}
	
}
