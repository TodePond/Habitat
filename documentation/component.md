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
