# Stage

## `new Stage(options)`

Create a simple animated canvas with the following `options`.

| Option              | Description                                                     | Default    |
| ------------------- | --------------------------------------------------------------- | ---------- |
| `context` (default) | What type of stage to create                                    | `"2d"`     |
| `tick`              | Function that runs every frame                                  | `() => {}` |
| `update`            | Function that runs every frame (except when `paused`)           | `() => {}` |
| `start`             | Function that runs after the stage starts                       | `() => {}` |
| `resize`            | Function that runs after the screen resizes                     | `() => {}` |
| `paused`            | Whether `update` runs or not (toggled by pressing the spacebar) | `false`    |
| `speed`             | How many `tick` functions should run per frame                  | `1.0`      |

Here is a simple example:

```javascript
const stage = new Stage()
stage.tick = (context) => {
	// Clear the screen every frame!
	context.clearRect(0, 0, context.canvas.width, context.canvas.height)

	// Draw whatever you want!
	context.fillStyle = BLUE
	context.fillRect(0, 0, 10, 10)
}
```

## Contexts

You can make different kinds of contexts. Here are the types:

| Layer  | Description       |
| ------ | ----------------- |
| `2d`   | 2D canvas context |
| `html` | HTML element      |
| `svg`  | SVG element       |

You can also use an array to make multiple layers of contexts.

```javascript
const stage = new Stage({ context: ["2d", "html", "2d"] })

stage.start = ([background, html, foreground]) => {
	background.fillStyle = BLUE
	background.fillRect(0, 0, background.canvas.width, background.canvas.height)

	html.innerHTML = "Hello, world!"

	foreground.fillStyle = RED
	foreground.fillRect(30, 30, 100, 100)
	foreground.canvas.style["pointer-events"] = "none"
}
```

Or you can use an object to name the layers.

```javascript
const stage = new Stage({
	context: { background: "2d", html: "html", foreground: "2d" },
})

stage.start = ({ background, html, foreground }) => {
	background.fillStyle = BLUE
	background.fillRect(0, 0, background.canvas.width, background.canvas.height)

	html.innerHTML = "Hello, world!"

	foreground.fillStyle = RED
	foreground.fillRect(30, 30, 100, 100)
	foreground.canvas.style["pointer-events"] = "none"
}
```
