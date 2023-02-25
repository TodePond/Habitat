import { on } from "./event.js"
import { keyDown } from "./keyboard.js"

export const Stage = class {
	constructor(options) {
		const properties = {
			context: "2d",

			speed: 1.0,
			paused: false,

			start: () => {},
			resize: () => {},
			tick: () => {},
			update: () => {},
			...options,
		}

		const layered = typeof properties.context !== "string"

		const contextTypes = layered ? properties.context : [properties.context]
		const layers = contextTypes.map((v) => new Layer(v))
		const context = layered ? layers.map((v) => v.context) : layers[0].context

		const internal = {
			layered,
			layers,
			context,
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

	fireStart = () => {
		document.body.style["background-color"] = "#06070a"
		document.body.style["margin"] = "0px"
		document.body.style["overflow"] = "hidden"

		for (const layer of this.layers) {
			layer.context = layer.start()
		}

		this.context = this.layered ? this.layers.map((v) => v.context) : this.layers[0].context

		on("resize", () => this.fireResize())
		on(keyDown(" "), () => (this.paused = !this.paused))

		this.fireResize()
		this.start(this.context)
		this.fireTick()
	}

	fireResize = () => {
		for (const layer of this.layers) {
			layer.resize(layer.context)
		}

		this.resize(this.context)
	}

	fireTick = (time) => {
		this.clock += this.speed
		while (this.clock > 0) {
			if (!this.paused) this.update(this.context, time)
			this.tick(this.context, time)
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
		canvas.style["position"] = "absolute"
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
