# Mouse

## `Mouse`

An object that contains the state of every mouse button. `true` = currently pressed down. `false` = currently up. `undefined` = not pressed down yet.

```javascript
if (Mouse.Right) print("The right mouse button is pressed down")
if (!Mouse.Left) print("The left mouse button is not pressed down")
```

## `Mouse.position`

The current `[x, y]`position of the mouse.

```javascript
const [x, y] = Mouse.position
```

## ``
