# Mouse

## `getMouse()`
Get an object that tracks the state of the mouse.

| Value       | Meaning                      |
| ----------- | ---------------------------- |
| `true`      | Key is down                  |
| `false`     | Key is up                    |
| `undefined` | Key has not been pressed yet |

```javascript
const mouse = getMouse()
if (mouse.Left) print("The left mouse button is pressed down")
```

## `.position`
The mouse position.
```javascript
const mouse = getMouse()
const [x, y] = mouse.position
```