//========//
// Colour //
//========//
{
	
	Habitat.Colour = {}
	
	Habitat.Colour.hsl = (h, s, l) => {
		const [r, g, b] = getRGB(h, s, l)
		return makeColour([r, g, b], [h, s, l])
	}

	Habitat.Colour.rgb = (r, g, b) => {
		const [h, s, l] = getHSL(r, g, b)
		return makeColour([r, g, b], [h, s, l])
	}

	const makeColour = ([r, g, b], [h, s, l]) => {
		const rgb = `rgb(${r}, ${g}, ${b})`
		const hsl = `hsl(${h}, ${s}%, ${l}%)`
		const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

		const colour = new Uint8Array([r, g, b])

		colour.r = r
		colour.g = g
		colour.b = b
		
		colour.red = r
		colour.green = g
		colour.blue = b

		colour.h = h
		colour.s = s
		colour.l = l

		colour.hue = h
		colour.saturation = s
		colour.lightness = l
		
		colour.toString = () => hex
		colour.hex = hex
		colour.rgb = rgb
		colour.hsl = hsl

		colour.brightness = (r*299 + g*587 + b*114) / 1000 / 255
		colour.isLight = colour.brightness > 0.7
		colour.isDark = colour.brightness < 0.3

		return colour
	}

	//https://css-tricks.com/converting-color-spaces-in-javascript/
	const getRGB = (h, s, l) => {

		let r = 0
		let g = 0
		let b = 0

		s /= 100
		l /= 100

		const c = (1 - Math.abs(2 * l - 1)) * s
		const x = c * (1 - Math.abs(h / 60) % 2 - 1)
		const m = l - c/2

		if (0 <= h && h < 60) {
			r = c
			g = x
			b = 0
		}
		else if (60 <= h && h < 120) {
			r = x
			g = c
			b = 0
		}
		else if (120 <= h && h < 180) {
			r = 0
			g = c
			b = x
		}
		else if (180 <= h && h < 240) {
			r = 0
			g = x
			b = c
		}
		else if (240 <= h && h < 300) {
			r = x
			g = 0
			b = c
		}
		else if (300 <= h && h < 360) {
			r = c
			g = 0
			b = x
		}
		
		r = Math.round((r+m) * 255)
		g = Math.round((g+m) * 255)
		b = Math.round((b+m) * 255)

		return [r, g, b]

	}

	//https://css-tricks.com/converting-color-spaces-in-javascript/
	const getHSL = (r, g, b) => {

		let h = 0
		let l = 0
		let s = 0
		
		r /= 255
		g /= 255
		b /= 255
		
		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		const delta = max - min
		
		if (delta === 0) h = 0
		else if (max === r) h = ((g-b) / delta) % 6
		else if (max === g) h = ((b-r) / delta) + 2
		else if (max === b) h = ((r-g) / delta) + 4
		
		h = Math.round(h * 60)
		while (h < 0) h += 360

		l = (max + min) / 2

		if (delta === 0) s = 0
		else s = delta / (1 - Math.abs(2*l-1)) + Number.EPSILON 

		s *= 100
		l *= 100

		return [h, s, l]
	}

	Habitat.Colour.Void = Habitat.Colour.rgb(6, 7, 10)
	Habitat.Colour.Black = Habitat.Colour.rgb(23, 29, 40)
	Habitat.Colour.Grey = Habitat.Colour.rgb(55, 67, 98)
	Habitat.Colour.Silver = Habitat.Colour.rgb(159, 174, 201)
	Habitat.Colour.White = Habitat.Colour.rgb(242, 245, 247)

	Habitat.Colour.Green = Habitat.Colour.rgb(70, 255, 128)
	Habitat.Colour.Red = Habitat.Colour.rgb(255, 70, 70)
	Habitat.Colour.Blue = Habitat.Colour.rgb(70, 128, 255)
	Habitat.Colour.Yellow = Habitat.Colour.rgb(255, 204, 70)
	Habitat.Colour.Orange = Habitat.Colour.rgb(255, 128, 70)
	Habitat.Colour.Pink = Habitat.Colour.rgb(255, 128, 128)
	Habitat.Colour.Rose = Habitat.Colour.rgb(255, 128, 204)
	Habitat.Colour.Cyan = Habitat.Colour.rgb(70, 204, 255)
	Habitat.Colour.Purple = Habitat.Colour.rgb(128, 70, 255)

	Habitat.Colour.install = (global) => {
		global.Colour = Habitat.Colour
		Habitat.Colour.installed = true
	}
	
}