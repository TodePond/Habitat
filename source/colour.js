//========//
// Colour //
//========//
{
	
	Habitat.Colour = {}
	
	Habitat.Colour.make = (style) => {

		const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
		canvas.width = 1
		canvas.height = 1
		context.fillStyle = style
		context.fillRect(0, 0, 1, 1)

		const data = context.getImageData(0, 0, 1, 1).data
		const [red, green, blue, alpha] = data
		const [hue, saturation, lightness] = getHSL(red, green, blue)
		const colour = new Uint8Array([red, green, blue, alpha])

		colour.red = red
		colour.green = green
		colour.blue = blue
		colour.alpha = alpha

		colour.r = red
		colour.g = green
		colour.b = blue
		colour.a = alpha

		const rgb = `rgb(${red}, ${green}, ${blue})`
		const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`
		const hex = `#${hexify(red)}${hexify(green)}${hexify(blue)}`
		const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`

		colour.toString = () => hex
		colour.rgb = rgb
		colour.rgba = rgba
		colour.hex = hex
		colour.hsl = hsl

		colour.brightness = (red*299 + green*587 + blue*114) / 1000 / 255
		colour.isBright = colour.brightness > 0.7
		colour.isDark = colour.brightness < 0.3

		return colour
	}

	const hexify = (number) => {
		const string = number.toString(16)
		if (string.length === 2) return string
		return "0"+string
	}

	//https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
	const getHSL = (red, green, blue) => {

		red /= 255
		green /= 255
		blue /= 255

		const max = Math.max(red, green, blue)
		const min = Math.min(red, green, blue)
		const chroma = max - min

		let lightness = (max + min) / 2
		let saturation = 0
		if (lightness !== 0 && lightness !== 1) {
			saturation = (max - lightness) / Math.min(lightness, 1-lightness)
		}
		
		let hue = 0
		if (max === red) hue = (green-blue)/chroma
		if (max === green) hue = 2 + (blue-red)/chroma
		if (max === blue) hue = 4 + (red-green)/chroma

		lightness *= 100
		saturation *= 100
		hue *= 60
		while (hue < 0) hue += 360

		return [hue, saturation, lightness]

	}
	
	/*Habitat.Colour.add = (colour, {r=0, g=0, b=0, red=0, green=0, blue=0, h=0, s=0, l=0, hue=0, saturation=0, lightness=0} = {}) => {
		
		const nr = clamp(colour.r + r + red, 0, 255)
		const ng = clamp(colour.g + g + green, 0, 255)
		const nb = clamp(colour.b + b + blue, 0, 255)
		const rgbColour = Habitat.Colour.rgb(nr, ng, nb)
		
		const nh = wrap(rgbColour.h + h + hue, 0, 360)
		const ns = clamp(rgbColour.s + s + saturation, 0, 100)
		const nl = clamp(rgbColour.l + l + lightness, 0, 100)
		const hslColour = Habitat.Colour.hsl(nh, ns, nl)

		return hslColour

	}

	Habitat.Colour.multiply = (colour, {r=1, g=1, b=1, red=1, green=1, blue=1, h=1, s=1, l=1, hue=1, saturation=1, lightness=1} = {}) => {
		
		const nr = clamp(colour.r * r * red, 0, 255)
		const ng = clamp(colour.g * g * green, 0, 255)
		const nb = clamp(colour.b * b * blue, 0, 255)
		const rgbColour = Habitat.Colour.rgb(nr, ng, nb)
		
		const nh = wrap(rgbColour.h * h * hue, 0, 360)
		const ns = clamp(rgbColour.s * s * saturation, 0, 100)
		const nl = clamp(rgbColour.l * l * lightness, 0, 100)
		const hslColour = Habitat.Colour.hsl(nh, ns, nl)

		return hslColour

	}*/

	Habitat.Colour.Void = Habitat.Colour.make("rgb(6, 7, 10)")
	Habitat.Colour.Black = Habitat.Colour.make("rgb(23, 29, 40)")
	Habitat.Colour.Grey = Habitat.Colour.make("rgb(55, 67, 98)")
	Habitat.Colour.Silver = Habitat.Colour.make("rgb(159, 174, 201)")
	Habitat.Colour.White = Habitat.Colour.make("rgb(242, 245, 247)")

	Habitat.Colour.Green = Habitat.Colour.make("rgb(70, 255, 128)")
	Habitat.Colour.Red = Habitat.Colour.make("rgb(255, 70, 70)")
	Habitat.Colour.Blue = Habitat.Colour.make("rgb(70, 128, 255)")
	Habitat.Colour.Yellow = Habitat.Colour.make("rgb(255, 204, 70)")
	Habitat.Colour.Orange = Habitat.Colour.make("rgb(255, 128, 70)")
	Habitat.Colour.Pink = Habitat.Colour.make("rgb(255, 128, 128)")
	Habitat.Colour.Rose = Habitat.Colour.make("rgb(255, 128, 204)")
	Habitat.Colour.Cyan = Habitat.Colour.make("rgb(70, 204, 255)")
	Habitat.Colour.Purple = Habitat.Colour.make("rgb(128, 70, 255)")

	Habitat.Colour.install = (global) => {
		global.Colour = Habitat.Colour
		Habitat.Colour.installed = true
	}
	
}