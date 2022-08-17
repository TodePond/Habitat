//========//
// Colour //
//========//
{
	
	Habitat.Colour = {}
	
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
		if (chroma === 0) hue = 0

		lightness *= 100
		saturation *= 100
		hue *= 60
		while (hue < 0) hue += 360

		return [hue, saturation, lightness]

	}

	const getSplash = (red, green, blue) => {
		const closestRed = getClosest(red, reds).toString()
		const closestGreen = getClosest(green, greens).toString()
		const closestBlue = getClosest(blue, blues).toString()
		const string = closestRed + closestGreen + closestBlue
		const splash = parseInt(string)
		return splash
	}

	const getClosest = (number, array) => {
		let highscore = Infinity
		let winner = 0
		for (let i = 0; i < array.length; i++) {
			const value = array[i]
			const difference = Math.abs(number - value)
			if (difference < highscore) {
				highscore = difference
				winner = i
			}
		}
		return winner
	}

	const clamp = (number, min, max) => {
		if (number < min) return min
		if (number > max) return max
		return number
	}

	const wrap = (number, min, max) => {
		const difference = max - min
		while (number < min) number += difference
		while (number > max) number -= difference
		return number
	}
	
	const reds   = [23, 55, 70,  98, 128, 159, 174, 204, 242, 255]
	const greens = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
	const blues  = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]

	Habitat.Colour.install = (global) => {

		Habitat.Colour.make = (style) => {

			if (typeof style === "number") {
				let string = style.toString()
				while (string.length < 3) string = "0"+string
				
				const redId = parseInt(string[0])
				const greenId = parseInt(string[1])
				const blueId = parseInt(string[2])
	
				const red = reds[redId]
				const green = greens[greenId]
				const blue = blues[blueId]
	
				const rgb = `rgb(${red}, ${green}, ${blue})`
	
				const colour = Habitat.Colour.make(rgb)
				colour.splash = style
				return colour
			}
	
			if (document === undefined) {
				return
			}
	
			const canvas = global.document.createElement("canvas")
			const context = canvas.getContext("2d")
			canvas.width = 1
			canvas.height = 1
			context.fillStyle = style
			context.fillRect(0, 0, 1, 1)
	
			const data = context.getImageData(0, 0, 1, 1).data
			const [red, green, blue] = data
			const splash = getSplash(red, green, blue)
			const alpha = data[3] / 255
			const [hue, saturation, lightness] = getHSL(red, green, blue)
			const colour = new Uint8Array([red, green, blue, alpha])
			colour.fullColour = true
			
			colour.red = red
			colour.green = green
			colour.blue = blue
			colour.alpha = alpha
	
			colour.splash = splash
	
			colour.hue = hue
			colour.saturation = saturation
			colour.lightness = lightness
	
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
		
		Habitat.Colour.add = (colour, {red=0, green=0, blue=0, alpha=0, hue=0, saturation=0, lightness=0, r=0, g=0, b=0, a=0, h=0, s=0, l=0, splash, fullColour = false} = {}) => {
			
			const newRed = clamp(colour.red + r + red, 0, 255)
			const newGreen = clamp(colour.green + g + green, 0, 255)
			const newBlue = clamp(colour.blue + b + blue, 0, 255)
			const newAlpha = clamp(colour.alpha + a + alpha, 0, 1)
			const rgbaStyle = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${newAlpha})`
			const rgbaColour = Habitat.Colour.make(rgbaStyle)

			if (fullColour) return rgbaColour

			const newHue = wrap(rgbaColour.hue + h + hue, 0, 360)
			const newSaturation = clamp(rgbaColour.saturation + s + saturation, 0, 100)
			const newLightness = clamp(rgbaColour.lightness + l + lightness, 0, 100)
			const hslStyle = `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`
			const hslColour = Habitat.Colour.make(hslStyle)

			if (splash !== undefined && splashed) {
				const newSplash = hslColour.splash + splash
				const splashColour = Habitat.Colour.make(newSplash)
				return splashColour
			}

			return hslColour

		}
		
		Habitat.Colour.multiply = (colour, {red=1, green=1, blue=1, alpha=1, hue=1, saturation=1, lightness=1, r=1, g=1, b=1, a=1, h=1, s=1, l=1, splash, fullColour = false} = {}) => {
			
			const newRed = clamp(colour.red * r * red, 0, 255)
			const newGreen = clamp(colour.green * g * green, 0, 255)
			const newBlue = clamp(colour.blue * b * blue, 0, 255)
			const newAlpha = clamp(colour.alpha * a * alpha, 0, 1)
			const rgbaStyle = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${newAlpha})`
			const rgbaColour = Habitat.Colour.make(rgbaStyle)

			if (fullColour) return rgbaColour

			const newHue = wrap(rgbaColour.hue * h * hue, 0, 360)
			const newSaturation = clamp(rgbaColour.saturation * s * saturation, 0, 100)
			const newLightness = clamp(rgbaColour.lightness * l * lightness, 0, 100)
			const hslStyle = `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`
			const hslColour = Habitat.Colour.make(hslStyle)

			if (splash !== undefined) {
				const newSplash = hslColour.splash * splash
				const splashColour = Habitat.Colour.make(newSplash)
				return splashColour
			}

			return hslColour

		}

		Habitat.Colour.Void = Habitat.Colour.make("rgb(6, 7, 10)")
		Habitat.Colour.Black = Habitat.Colour.make(0)
		Habitat.Colour.Grey = Habitat.Colour.make(112)
		Habitat.Colour.Silver = Habitat.Colour.make(556)
		Habitat.Colour.White = Habitat.Colour.make(888)
	
		Habitat.Colour.Green = Habitat.Colour.make(293)
		Habitat.Colour.Red = Habitat.Colour.make(911)
		Habitat.Colour.Blue = Habitat.Colour.make(239)
		Habitat.Colour.Yellow = Habitat.Colour.make(961)
		Habitat.Colour.Orange = Habitat.Colour.make(931)
		Habitat.Colour.Pink = Habitat.Colour.make(933)
		Habitat.Colour.Rose = Habitat.Colour.make(936)
		Habitat.Colour.Cyan = Habitat.Colour.make(269)
		Habitat.Colour.Purple = Habitat.Colour.make(418)
	
		Habitat.Colour.cache = []
		Habitat.Colour.splash = (number) => {
			if (Habitat.Colour.cache.length === 0) {
				for (let i = 0; i < 1000; i++) {
					const colour = Habitat.Colour.make(i)
					Habitat.Colour.cache.push(colour)
				}
			}
	
			return Habitat.Colour.cache[number]
		}

		global.Colour = Habitat.Colour
		Habitat.Colour.installed = true
	}
	
}