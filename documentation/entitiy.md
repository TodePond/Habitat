# Entity

## `new Entity(components)`

You can make an entity that has some components.

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
  constructor(colour = ORANGE) {
    super([
      new Component.Rectangle(10, 10),
      new Component.Transform(),
    ])
    
    this.colour = colour
  }
}

const box = new Box(BLUE)
```

