import { glue, use } from "./signal.js"
import { add, rotate } from "./vector.js"

export const Component = class {
	constructor(name = "component") {
		this._name = name
		this._entity = use(undefined)
	}
}

Component.Transform = class extends Component {
	_name = "transform"
	position = use([0, 0])
	scale = use([1, 1])
	rotation = use(0)

	absolutePosition = use(
		() => {
			const { _entity } = this
			const { parent } = _entity
			if (!parent || !parent.transform) {
				return this.position
			}
			const rotatedPosition = rotate(this.position, parent.transform.absoluteRotation)
			return add(parent.transform.absolutePosition, rotatedPosition)
		},
		{ lazy: true },
	)

	absoluteScale = use(
		() => {
			const { _entity } = this
			const { parent } = _entity
			if (!parent || !parent.transform) {
				return this.scale
			}
			const [x, y] = this.scale
			const [px, py] = parent.transform.absoluteScale
			return [x * px, y * py]
		},
		{ lazy: true },
	)

	absoluteRotation = use(
		() => {
			const { _entity } = this
			const { parent } = _entity
			if (!parent || !parent.transform) {
				return this.rotation
			}
			return this.rotation + parent.transform.absoluteRotation
		},
		{ lazy: true },
	)

	constructor() {
		super()
		glue(this)
	}
}

Component.Stage = class extends Component {
	_name = "stage"

	constructor(stage) {
		super()
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
