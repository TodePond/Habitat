import { on } from "./event.js"
import { keyDown } from "./keyboard.js"

export const Stage = function (options) {
	const properties = {
		context: undefined,

		speed: 1.0,
		paused: false,

		start: () => {},
		resize: () => {},
		tick: () => {},
		update: () => {},
		...options,
	}

	const internal = {
		clock: 0.0,
	}

	const stage = {
		...internal,
		...properties,
	}

	if (document.body === null) {
		addEventListener("load", () => {
			requestAnimationFrame(() => start(stage))
		})
	} else {
		requestAnimationFrame(() => start(stage))
	}

	return stage
}

const start = (stage) => {
	// Create a context + canvas if no context was provided
	if (stage.context === undefined) {
		const canvas = document.createElement("canvas")
		canvas.style["background-color"] = "#171d28"
		document.body.style["background-color"] = "#06070a"
		document.body.style["margin"] = "0px"
		document.body.style["overflow"] = "hidden"
		document.body.appendChild(canvas)
		stage.context = canvas.getContext("2d")
	}

	on("resize", () => resize(stage))
	on(keyDown(" "), () => (stage.paused = !stage.paused))

	stage.start(stage.context)
	resize(stage)
	tick(stage)
}

const resize = (stage) => {
	const { canvas } = stage.context
	canvas.width = Math.round(innerWidth)
	canvas.height = Math.round(innerHeight)
	canvas.style["width"] = canvas.width
	canvas.style["height"] = canvas.height
	stage.resize(stage.context)
}

const tick = (stage, time) => {
	stage.clock += stage.speed
	while (stage.clock > 0) {
		if (!stage.paused) stage.update(stage.context, time)
		stage.tick(stage.context, time)
		stage.clock--
	}

	requestAnimationFrame((time) => tick(stage, time))
}
