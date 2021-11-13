//======//
// Main //
//======//
Habitat.install = (global) => {

	if (Habitat.installed) return

	if (!Habitat.Array.installed)      Habitat.Array.install(global)
	if (!Habitat.Async.installed)      Habitat.Async.install(global)
	if (!Habitat.Colour.installed)     Habitat.Colour.install(global)
	if (!Habitat.Console.installed)    Habitat.Console.install(global)
	if (!Habitat.Document.installed)   Habitat.Document.install(global)
	if (!Habitat.Event.installed)      Habitat.Event.install(global)
	if (!Habitat.HTML.installed)       Habitat.HTML.install(global)
	if (!Habitat.JavaScript.installed) Habitat.JavaScript.install(global)
	if (!Habitat.Keyboard.installed)   Habitat.Keyboard.install(global)
	if (!Habitat.Math.installed)       Habitat.Math.install(global)
	if (!Habitat.Mouse.installed)      Habitat.Mouse.install(global)
	if (!Habitat.Number.installed)     Habitat.Number.install(global)
	if (!Habitat.Object.installed)     Habitat.Object.install(global)
	if (!Habitat.Property.installed)   Habitat.Property.install(global)
	if (!Habitat.Random.installed)     Habitat.Random.install(global)
	if (!Habitat.Stage.installed)      Habitat.Stage.install(global)
	if (!Habitat.String.installed)     Habitat.String.install(global)
	if (!Habitat.Touches.installed)    Habitat.Touches.install(global)
	if (!Habitat.Tween.installed)      Habitat.Tween.install(global)
	if (!Habitat.Type.installed)       Habitat.Type.install(global)
	
	Habitat.installed = true
	
}