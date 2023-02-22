# Stage

## `new Stage(properties)`

Create a simple animated canvas with the following `properties`.

| Property | Description                                                     | Default    |
| -------- | --------------------------------------------------------------- | ---------- |
| `layers` | Which layers to create                                          | `["2d"]`   |
| `tick`   | Function that runs every frame                                  | `() => {}` |
| `update` | Function that runs every frame (except when `paused`)           | `() => {}` |
| `start`  | Function that runs after the stage starts                       | `() => {}` |
| `resize` | Function that runs after the screen resizes                     | `() => {}` |
| `paused` | Whether `update` runs or not (toggled by pressing the spacebar) | `false`    |
| `speed`  | How many `tick` functions should run per frame                  | `1.0`      |

Here is a simple example:

```javascript
const stage = new Stage()
stage.tick = ([context], time) => {
	// Clear the screen every frame!
	context.clearRect(0, 0, context.canvas.width, context.canvas.height)

	// Draw whatever you want!
	context.fillStyle = BLUE
	context.fillRect(0, 0, 10, 10)
}
```

## Layers

You can make different kinds of layers.

| Layer  | Description  |
| ------ | ------------ |
| `2d`   | 2D canvas    |
| `html` | HTML element |

They get passed to your functions.

```javascript
const stage = new Stage({ layers: ["2d", "html", "2d"] })

stage.start = ([background, html, foreground]) => {
	background.fillStyle = BLUE
	background.fillRect(0, 0, background.canvas.width, background.canvas.height)

	html.innerHTML = "Hello, world!"

	foreground.fillStyle = RED
	foreground.fillRect(30, 30, 100, 100)
	foreground.canvas.style["pointer-events"] = "none"
}
```
