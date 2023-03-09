# Entity

## new Entity(components)

You can make an entity that has some components.

```javascript
const box = new Entity([
  new Component.Stage(),
  new Component.Transform(),
])
```

## new Entity(properties)

You can make an entity that has some initial properties.

```javascript
const box = new Entity({
  components: [
    new Component.Stage(),
    new Component.Transform(),
  ],
  
  tick(context) {
    const [x, y] = this.transform.position
    context.fillStyle = BLUE
    context.fillRect(x, y, 10, 10)
  },
})
```

