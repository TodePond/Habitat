//========//
// Colour //
//========//
{
	
	Habitat.Colour = {}

	Habitat.Colour.make = (r, g, b) => {
		const colour = new Uint8Array([r, g, b])
		const string = `rgb(${r}, ${g}, ${b})`
		const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
		colour.toString = () => string
		colour.toHex = () => hex

		colour.brightness = (r*299 + g*587 + b*114) / 1000 / 255
		colour.isLight = colour.brightness > 0.7
		colour.isDark = colour.brightness < 0.3
		
		colour.r = r
		colour.g = g
		colour.b = b

		return colour
	}

	Habitat.Colour.Void = Habitat.Colour.make(12, 15, 20)
	Habitat.Colour.Black = Habitat.Colour.make(23, 29, 40)
	Habitat.Colour.Grey = Habitat.Colour.make(55, 67, 98)
	Habitat.Colour.Silver = Habitat.Colour.make(159, 174, 201)
	Habitat.Colour.White = Habitat.Colour.make(242, 245, 247)

	Habitat.Colour.Green = Habitat.Colour.make(70, 255, 128)
	Habitat.Colour.Red = Habitat.Colour.make(255, 70, 70)
	Habitat.Colour.Blue = Habitat.Colour.make(70, 128, 255)
	Habitat.Colour.Yellow = Habitat.Colour.make(255, 204, 70)
	Habitat.Colour.Orange = Habitat.Colour.make(255, 128, 70)
	Habitat.Colour.Pink = Habitat.Colour.make(255, 128, 128)
	Habitat.Colour.Rose = Habitat.Colour.make(255, 128, 204)
	Habitat.Colour.Cyan = Habitat.Colour.make(70, 204, 255)
	Habitat.Colour.Purple = Habitat.Colour.make(128, 70, 255)

	Habitat.Colour.install = (global) => {
		global.Colour = Habitat.Colour
		Habitat.Colour.installed = true
	}
	
}