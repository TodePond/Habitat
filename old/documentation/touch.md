# Touch

## `getTouches()`

Get an array that tracks the state of touches.

```javascript
const touches = getTouches()
for (const touch of touches) {
	const [x, y] = touch.position
}
```
