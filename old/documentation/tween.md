# Tween

## `tween(object, property, options = {})`

Animate an `object`'s `property` over time.
| Option | Value | Default |
| -------- | -------------------------------------------------------------- | ---------------------------- |
| `start` | The value to start from | The property's current value |
| `end` | The value to animate towards | The property's current value |
| `duration` | The duration of the animation | `1000` |
| `easeIn` | How much to smooth the start of the animation | `0.0` |
| `easeOut` | How much to smooth the end of the animation | `0.0` |
| `ratio` | How far along the animation to center any smoothing | `0.5` |

```javascript
const plant = { height: 3 }
plant.tween("height", { start: 5 })
plant.tween("height", { start: 0, end: 10, duration: 2000 })
plant.tween("height", { end: 100, easeIn: 1.0, easeOut: 2.5 })
```
