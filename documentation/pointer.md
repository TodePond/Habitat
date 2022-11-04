# Pointer

## `getPointer()`
Get an object that tracks the state of the pointer.

```javascript
const pointer = getPointer()
if (pointer.Left) print("The pointer is pressed down")
```

## `.down`
Whether the pointer is down or up.

| Value       | Meaning                      |
| ----------- | ---------------------------- |
| `true`      | Key is down                  |
| `false`     | Key is up                    |
| `undefined` | Key has not been pressed yet |

```javascript
const pointer = getPointer()
if (pointer.down) print("The pointer is pressed down")
```

## `.position`
The pointer position.
```javascript
const pointer = getPointer()
const [x, y] = pointer.position
```