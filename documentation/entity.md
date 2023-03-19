# Entity

## `new Entity(components = [])`

You can make an entity that has some components.

<!-- prettier-ignore -->
```javascript
const box = new Entity([
	new Component.Rectangle(10, 10),
	new Component.Transform(),
])
```

## `class extends Entity`

You might want to make your own Entity class.

<!-- prettier-ignore -->
```javascript
const Box = class extends Entity {
	components = [
		new Component.Rectangle(10, 10),
		new Component.Transform(),
	]
}

const box = new Box(BLUE)
```
