import { glue, snuse, use } from "./signal.js"
import { add, rotate } from "./vector.js"

export const Component = class {
	constructor(name = "component") {
		this._name = name
		this._entity = use(undefined)
	}
}

Component.Transform = class extends Component {
	constructor() {
		super("transform")
		glue(this)
	}

	position = use([0, 0])
	scale = use([1, 1])
	rotation = use(0)

	absolutePosition = snuse(() => {
		const { _entity } = this
		const { parent } = _entity
		if (!parent || !parent.transform) {
			return this.position
		}
		const rotatedPosition = rotate(this.position, parent.transform.absoluteRotation)
		return add(parent.transform.absolutePosition, rotatedPosition)
	})

	absoluteScale = snuse(() => {
		const { _entity } = this
		const { parent } = _entity
		if (!parent || !parent.transform) {
			return this.scale
		}
		const [x, y] = this.scale
		const [px, py] = parent.transform.absoluteScale
		return [x * px, y * py]
	})

	absoluteRotation = snuse(() => {
		const { _entity } = this
		const { parent } = _entity
		if (!parent || !parent.transform) {
			return this.rotation
		}
		return this.rotation + parent.transform.absoluteRotation
	})
}

Component.Stage = class extends Component {
	constructor(stage) {
		super("stage")
		if (stage) {
			this.connect(stage)
		}
	}

	tick(context) {
		const { _entity } = this
		_entity.tick?.(context)
		for (const child of _entity.children) {
			child.stage?.tick(context)
		}
	}

	update(context) {
		const { _entity } = this
		_entity.update?.(context)
		for (const child of _entity.children) {
			child.stage?.update(context)
		}
	}

	start(context) {
		const { _entity } = this
		_entity.start?.(context)
		for (const child of _entity.children) {
			child.stage?.start(context)
		}
	}

	resize(context) {
		const { _entity } = this
		_entity.resize?.(context)
		for (const child of _entity.children) {
			child.stage?.resize(context)
		}
	}

	connect(stage) {
		stage.tick = this.tick.bind(this)
		stage.update = this.update.bind(this)
		stage.start = this.start.bind(this)
		stage.resize = this.resize.bind(this)
	}
}

Component.Rectangle = class extends Component {
	constructor() {
		super("rectangle")
		glue(this)
	}

	dimensions = use([10, 10])
	scaledDimensions = snuse(() => {
		const [width, height] = this.dimensions
		const [scaleX, scaleY] = this._entity.transform.absoluteScale
		return [width * scaleX, height * scaleY]
	})

	bounds = snuse(() => {
		const { _entity } = this
		const [x, y] = _entity.transform.position
		const [width, height] = this.dimensions
		return {
			left: x,
			right: x + width,
			top: y,
			bottom: y + height,
		}
	})

	scaledBounds = snuse(() => {
		const { _entity } = this
		const [x, y] = _entity.transform.position
		const [width, height] = this.scaledDimensions
		return {
			left: x,
			right: x + width,
			top: y,
			bottom: y + height,
		}
	})

	absoluteBounds = snuse(() => {
		const { _entity } = this
		const [x, y] = _entity.transform.absolutePosition
		const [width, height] = this.scaledDimensions
		return {
			left: x,
			right: x + width,
			top: y,
			bottom: y + height,
		}
	})
}
