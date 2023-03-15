import { glue, use } from "./signal.js"

export const Entity = class {
	parent = use(null)
	children = new Set() //TODO: use a signal here once other signal types are implemented

	constructor(components = [], properties = {}) {
		for (const component of components) {
			this[component.name] = component
			component.entity = this
		}

		Object.assign(this, properties)
		glue(this)
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
