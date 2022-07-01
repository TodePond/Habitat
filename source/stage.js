//=======//
// Stage //
//=======//
{
	
	Habitat.Stage = {}
	Habitat.Stage.start = (options = {}) => {
		
		const {
			context,
			scale = 1.0,
			aspectRatio,
			speed = 1.0,
			paused = false,
			tick = () => {},
			update = () => {},
			resize = () => {},
		} = options

		const stage = {context, scale, aspectRatio, speed, paused, tick, update, resize}

		if (document.body === null) {
			addEventListener("load", () => register(stage))
		} else {
			requestAnimationFrame(() => register(stage))
		}
		
		return stage
	}

	const register = (stage) => {
		
		// Create a context + canvas if none was provided
		if (stage.context === undefined) {
			const canvas = document.createElement("canvas")
			canvas.style["background-color"] = "#171d28"
			canvas.style["image-rendering"] = "pixelated"
			document.body.style["background-color"] = "#06070a"
			document.body.style["margin"] = "0px"
			document.body.style["overflow"] = "hidden"
			document.body.appendChild(canvas)
			stage.context = canvas.getContext("2d")
		}

		addEventListener("resize", () => resize(stage))
		addEventListener("keydown", (e) => {
			if (e.key === " ") stage.paused = !stage.paused
		})
		
		resize(stage)
		tick(stage)

	}

	const tick = (stage) => {
		stage.clock += stage.speed
		while (stage.clock > 0) {
			if (!stage.paused) stage.update(stage.context)
			stage.tick(stage.context, stage)
			stage.clock--
		}
		
		requestAnimationFrame(() => tick(stage))
	}

	const resize = (stage) => {

		let width = innerWidth
		let height = innerHeight
		
		if (stage.aspectRatio !== undefined) {
			const [x, y] = stage.aspectRatio
			height = innerWidth * y/x
			const heightGrowth = height / innerHeight
			if (heightGrowth > 1.0) {
				height /= heightGrowth
				width /= heightGrowth
			}
		}

		const scaledWidth = width * stage.scale
		const scaledHeight = height * stage.scale

		const {canvas} = stage.context
		canvas.width = Math.round(scaledWidth)
		canvas.height = Math.round(scaledHeight)
		canvas.style["width"] = canvas.width
		canvas.style["height"] = canvas.height
		
		const marginHorizontal = (innerWidth - scaledWidth)/2
		const marginVertical = (innerHeight - scaledHeight)/2
		canvas.style["margin-left"] = marginHorizontal
		canvas.style["margin-right"] = marginHorizontal
		canvas.style["margin-top"] = marginVertical
		canvas.style["margin-bottom"] = marginVertical
		stage.resize(stage.context)
	}
	
	Habitat.Stage.install = (global) => {
		global.Stage = Habitat.Stage
		Habitat.Stage.installed = true
	}
	
}