# Component

## `new Component(name)`

Make a component for use with an [entity](Entity.md).

```javascript
const Stats = class extends Component {
    health = 10    
    constructor() {
        super("stats")
    }
}

const player = new Entity([new Stats()])
print(player.stats.health) //10
```

## `class extends Component`

You might want to make your own component class.

```javascript
const Info = class extends Component {
	health = use(10)
	isAlive = use(() => this.health > 0)

	construct() {
		super("info")
		glue(this)
	}
}

const player = new Entity([new Info()])
```

## `Component.prototype.entity`

The entity that a component is attached to.

```javascript
const transform = new Component.Transform()
const box = new Entity([transform])

print(component.entity) //box
```

## `Component.prototype.name`

The name of the component.

```javascript
const transform = new Component.Transform()

print(transform.name) //"transform"
```

## In-Built Components

#### `new Component.Transform()`

| Property   | Default  | Description       |
| ---------- | -------- | ----------------- |
| `position` | `[0, 0]` | Relative position |
| `scale`    | `[1, 1]` | Relative scale    |
| `rotation` | `0`      | Relative rotation |

| Dynamic Property   | Description       |
| ------------------ | ----------------- |
| `absolutePostion`  | Absolute position |
| `absoluteScale`    | Absolute scale    |
| `absoluteRotation` | Absolute rotation |

```javascript
const parent = new Entity([new Component.Transform()])
const child = new Entity([new Component.Transform()])
parent.add(child)

parent.transform.position = [10, 10]
child.transform.position = [20, 20]

print(child.transform.absolutePosition) //[30, 30]
```

#### `new Component.Rectangle(dimensions = [10, 10])`

Make a component that represents a rectangle.

| Property     | Default    | Description         |
| ------------ | ---------- | ------------------- |
| `dimensions` | `[10, 10]` | Relative dimensions |

| Dynamic Property     | Description         |
| -------------------- | ------------------- |
| `scaledDimensions`   | Scaled dimensions   |
| `absoluteDimensions` | Absolute dimensions |
| `bounds`             | Relative bounds     |
| `scaledBounds`       | Scaled bounds       |
| `absoluteBounds`     | Absolute bounds     |

```javascript
const box = new Entity([new Component.Transform(), new Component.Rectangle(10, 10)])
box.transform.position = [10, 10]
box.transform.scale = [2, 2]

print(box.rectangle.dimensions) //[10, 10]
print(box.rectangle.scaledDimensions) //[20, 20]

print(box.rectangle.bounds) //{left: 0, top: 0, right: 10, bottom: 10}
print(box.rectangle.absoluteBounds) //{left: 10, top: 10, right: 30, bottom: 30}
```

#### `new Component.Stage(stage?)`

Make a component that provides some methods for drawing to a stage.<br>
It connects to a `stage` that you pass to it.

Connected stages fire the component's methods automatically.<br>
All stage methods are passed to the entity itself, as all as all its children.<br>

| Method            | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `connect(stage)`  | Connect to a stage.                                        |
| `tick(context)`   | Run the `tick` function of this entity and its children.   |
| `update(context)` | Run the `update` function of this entity and its children. |
| `start(context)`  | Run the `start` function of this entity and its children.  |
| `resize(context)` | Run the `resize` function of this entity and its children. |

```javascript
const stage = new Stage()
const box = new Entity([new Component.Stage(stage)], {
	start(context) {
		context.fillStyle = BLUE
		context.fillRect(0, 0, 10, 10)
	},
})
```
