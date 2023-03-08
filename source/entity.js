import { use } from "./signal.js"

export const Entity = class {
	constructor(components = []) {
		for (const component of components) {
			this[component.name] = component
			component.entity = this
		}
	}
}

export const Component = class {
	name = "anonymous"
}

Component.Transform = class extends Component {
	name = "transform"
	position = use([0, 0])

	constructor() {
		super()
		glueSignals(this)
	}
}
