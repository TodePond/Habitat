//=======//
// Stage //
//=======//
{
	
	Habitat.Stage = {}
	Habitat.Stage.start = (options = {}) => {
		
		const {
			canvas,
			context,
			scale = 1.0,
			aspectRatio,
			speed = 1.0,
			paused = false,
			tick = () => {},
			update = () => {},
			resize = () => {},
		} = options

		const stage = {canvas, context, scale, aspectRatio, speed, paused, tick, update, resize}

		if (document.body === null) {
			addEventListener("load", () => register(stage))
		} else {
			requestAnimationFrame(() => register(stage))
		}
		
		return stage
	}

	const register = (stage) => {
		
		// Create a canvas if none was provided
		if (stage.canvas === undefined) {
			stage.canvas = document.createElement("canvas")
			stage.canvas.style["background-color"] = "#171d28"
			stage.canvas.style["image-rendering"] = "pixelated"
			document.body.style["background-color"] = "#06070a"
			document.body.style["margin"] = "0px"
			document.body.style["overflow"] = "hidden"
			document.body.appendChild(stage.canvas)
		}

		// Create a context if none was provided
		if (stage.context === undefined) {
			stage.context = stage.canvas.getContext("2d")
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
			if (!stage.paused) stage.update(stage.context, stage.canvas)
			stage.tick(stage.context, stage.canvas)
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

		stage.canvas.width = Math.round(scaledWidth)
		stage.canvas.height = Math.round(scaledHeight)
		stage.canvas.style["width"] = stage.canvas.width
		stage.canvas.style["height"] = stage.canvas.height
		
		const marginHorizontal = (innerWidth - scaledWidth)/2
		const marginVertical = (innerHeight - scaledHeight)/2
		stage.canvas.style["margin-left"] = marginHorizontal
		stage.canvas.style["margin-right"] = marginHorizontal
		stage.canvas.style["margin-top"] = marginVertical
		stage.canvas.style["margin-bottom"] = marginVertical
		stage.resize(stage.context, stage.canvas)
	}
	
	Habitat.Stage.install = (global) => {
		global.Stage = Habitat.Stage
		Habitat.Stage.installed = true
	}
	
}