# Component

## `new Component(name)`

Make a component for use with an [entity](Entity.md).

```javascript
const component = new Component("stats")
component.health = 10

const player = new Entity([component])
print(player.stats.health) //10
```

## class extends Component

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

# In-Built Components

## `new Component.Transform()`

| Property   | Default  | Description                 |
| ---------- | -------- | --------------------------- |
| `position` | `[0, 0]` | Position relative to parent |
| `scale`    | `[1, 1]` | Scale relative to parent    |
| `rotation` | `0`      | Rotation relative to parent |

| Dynamic Property   | Description                    |
| ------------------ | ------------------------------ |
| `absolutePostion`  | Absolute position in the world |
| `absoluteScale`    | Absolute scale in the world    |
| `absoluteRotation` | Absolute rotation in the world |

```javascript
const parent = new Entity([new Component.Transform()])
const child = new Entity([new Component.Transform()])
parent.add(child)

parent.transform.position = [10, 10]
child.transform.position = [20, 20]

print(child.transform.absolutePosition) //[30, 30]
```

## `new Component.Stage(stage?)`

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
