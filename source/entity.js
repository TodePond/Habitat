import { glueSignals, use } from "./signal.js"

export const Entity = class {
	constructor(components = []) {
		for (const component of components) {
			this[component.name] = component
			component.entity = this
		}
	}
}

export const Component = class {
	slot = "component"
}

Component.Transform = class extends Component {
	slot = "transform"
	position = use([0, 0])

	constructor() {
		super()
		glueSignals(this)
	}
}
