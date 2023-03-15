import { glueSignals, use } from "./signal.js"
import { add, rotate } from "./vector.js"

export const Component = class {
	name = "component"
	entity = undefined
}

Component.Transform = class extends Component {
	name = "transform"
	position = use([0, 0])
	scale = use([1, 1])
	rotation = use(0)

	absolutePosition = use(
		() => {
			const { entity } = this
			const { parent } = entity
			if (!parent || !parent.transform) {
				return this.position
			}

			// This also factors in rotation
			const rotatedPosition = rotate(this.position, parent.transform.absoluteRotation)

			return add(parent.transform.absolutePosition, rotatedPosition)
		},
		{ lazy: true },
	)

	absoluteScale = use(
		() => {
			const { entity } = this
			const { parent } = entity
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
			const { entity } = this
			const { parent } = entity
			if (!parent || !parent.transform) {
				return this.rotation
			}
			return this.rotation + parent.transform.absoluteRotation
		},
		{ lazy: true },
	)

	constructor() {
		super()
		glueSignals(this)
	}
}

Component.Stage = class extends Component {
	name = "stage"

	constructor(stage) {
		super()
		if (stage) {
			this.connect(stage)
		}
	}

	tick(context) {
		const { entity } = this
		entity.tick?.(context)
		for (const child of entity.children) {
			child.stage?.tick(context)
		}
	}

	update(context) {
		const { entity } = this
		entity.update?.(context)
		for (const child of entity.children) {
			child.stage?.update(context)
		}
	}

	start(context) {
		const { entity } = this
		entity.start?.(context)
		for (const child of entity.children) {
			child.stage?.start(context)
		}
	}

	resize(context) {
		const { entity } = this
		entity.resize?.(context)
		for (const child of entity.children) {
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
