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
	store = true
}

Component.Transform = class {
	name = "transform"
	position = [0, 0]
}
