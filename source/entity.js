import { glueSignals, use } from "./signal.js"
import { add } from "./vector.js"

export const Entity = class {
	parent = use(null)
	children = new Set()

	constructor(properties = {}, options = {}) {
		if (Array.isArray(properties)) {
			properties = { components: properties }
		}

		const { components = [] } = properties
		for (const component of components) {
			this[component.slot] = component
			component.entity = this
		}

		Object.assign(this, properties, options)

		glueSignals(this)
	}

	add(entity) {
		if (entity === this) {
			throw new Error("Parent can't adopt itself")
		}

		if (entity.parent === this) {
			throw new Error("Parent already adopted child")
		}

		if (entity.parent !== null) {
			throw new Error("Parent can't adopt child that already has a parent")
		}

		entity.parent = this
		this.children.add(entity)
	}

	delete(entity) {
		if (entity.parent !== this) {
			throw new Error("Parent can't delete child that it doesn't own")
		}

		entity.parent = null
		this.children.delete(entity)
	}
}

export const Component = class {
	slot = "component"
	entity = undefined
}

Component.Transform = class extends Component {
	slot = "transform"
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
			return add(this.position, parent.transform.absolutePosition)
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
	slot = "stage"

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
