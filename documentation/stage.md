# Stage

## `new Stage(properties)`

Create a simple animated canvas with the following `properties`.

| Property      | Description                                                     | Default                                               |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| `context`     | 2D drawing context                                              | 2D drawing context of an automatically created canvas |
| `tick`        | Function that runs every frame                                  | `() => {}`                                            |
| `update`      | Function that runs every frame (except when `paused`)           | `() => {}`                                            |
| `start`       | Function that runs after the stage starts                       | `() => {}`                                            |
| `resize`      | Function that runs after the screen resizes                     | `() => {}`                                            |
| `paused`      | Whether `update` runs or not (toggled by pressing the spacebar) | `false`                                               |
| `speed`       | How many `tick` functions should run per frame                  | `1.0`                                                 |
| `scale`       | How big the default `canvas` is compared to the window          | `1.0`                                                 |
| `aspectRatio` | The aspect ratio to force the canvas to be (unless `undefined`) | `undefined`                                           |

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
