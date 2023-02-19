import { on } from "./event.js"
import { keyDown } from "./keyboard.js"

export const Stage = class {
	constructor(options) {
		const properties = {
			layers: ["2d"],

			speed: 1.0,
			paused: false,

			start: () => {},
			resize: () => {},
			tick: () => {},
			update: () => {},
			...options,
		}

		const internal = {
			layers: properties.layers.map((v) => new Layer(v)),
			clock: 0.0,
		}

		Object.assign(this, {
			...properties,
			...internal,
		})

		if (document.body === null) {
			addEventListener("load", () => {
				requestAnimationFrame(() => this.fireStart())
			})
		} else {
			requestAnimationFrame(() => this.fireStart())
		}
	}

	getContexts = () => this.layers.map((v) => v.context)

	fireStart = () => {
		document.body.style["background-color"] = "#06070a"
		document.body.style["margin"] = "0px"
		document.body.style["overflow"] = "hidden"

		for (const layer of this.layers) {
			layer.context = layer.start()
		}

		on("resize", () => this.fireResize())
		on(keyDown(" "), () => (this.paused = !this.paused))

		this.start(this.getContexts())
		this.fireResize()
		this.fireTick()
	}

	fireResize = () => {
		for (const layer of this.layers) {
			layer.resize(layer.context)
		}

		this.resize(this.getContexts())
	}

	fireTick = (time) => {
		this.clock += this.speed
		while (this.clock > 0) {
			if (!this.paused) this.update(this.getContexts(), time)
			this.tick(this.getContexts(), time)
			this.clock--
		}

		requestAnimationFrame((time) => this.fireTick(time))
	}
}

const LayerTemplate = class {
	start() {}
	resize() {}
}

const CanvasLayer = class extends LayerTemplate {
	start() {
		const canvas = document.createElement("canvas")
		document.body.appendChild(canvas)
		return canvas.getContext("2d")
	}

	resize(context) {
		const { canvas } = context
		canvas.width = Math.round(innerWidth)
		canvas.height = Math.round(innerHeight)
		canvas.style["width"] = canvas.width
		canvas.style["height"] = canvas.height
	}
}

const HTMLLayer = class extends LayerTemplate {
	start() {
		const div = document.createElement("div")
		div.style["position"] = "absolute"
		div.style["top"] = "0px"
		div.style["left"] = "0px"
		div.style["width"] = "100%"
		div.style["height"] = "100%"
		div.style["pointer-events"] = "none"
		document.body.appendChild(div)
		return div
	}
}

const Layer = class {
	static types = {
		"2d": CanvasLayer,
		"html": HTMLLayer,
	}

	constructor(type) {
		const Constructor = Layer.types[type]
		const layer = new Constructor()
		layer.type = type
		layer.context = null
		return layer
	}
}
