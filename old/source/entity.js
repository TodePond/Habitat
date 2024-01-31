import { Options } from "./options.js"
import { glue, use } from "./signal.js"

export const Entity = class {
	components = []
	parent = use(null)
	children = new Set() //TODO: use a signal here once other signal types are implemented

	static options = {
		default: "components",
		isDefault: (v) => Array.isArray(v),
		components: () => [],
	}

	constructor(head, tail) {
		const options = new Options(Entity.options)(head, tail)

		for (const component of options.components) {
			this[component.name] = component
			component.entity = this
		}

		Object.assign(this, options)
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
