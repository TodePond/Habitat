# Entity

## `new Entity(options)`

You can make an entity that has some components.

| Option                 | Description                   | Default |
| ---------------------- | ----------------------------- | ------- |
| `components` (default) | The entity's components       | `[]`    |
| `...properties`        | The entity's other properties | `{}`    |

<!-- prettier-ignore -->
```javascript
const box = new Entity([
	new Component.Rectangle(10, 10),
	new Component.Transform(),
])
```

## `class extends Entity`

You might want to make your own Entity class.

```javascript
const Box = class extends Entity {
	constructor() {
		super([new Component.Rectangle(10, 10), new Component.Transform()])
	}
}

const box = new Box()
```
