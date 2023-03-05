# Use

## `use(template)`

Use state based on a value.

```javascript
const count = use(0)
const display = HTML("<div></div>")
addEventListener("click", () => count.value++)

use(() => {
	display.textContent = count
})
```

Use state based on other state.

```javascript
const count = use(0)
const doubled = use(() => count * 2)
const display = HTML("<div></div>")
addEventListener("click", () => count.value++)

use(() => {
	display.textContent = doubled
})
```

Use state based on an object store.

```javascript
const player = use({
	name: "Lu",
	score: 0,
})

const display = HTML("<div></div>")
addEventListener("click", () => player.score++)

use(() => {
	display.textContent = `${player.name}: ${player.score}`
})
```

Use state based on an array store.

```javascript
const position = use([0, 0])
const display = HTML("<div></div>")

addEventListener("click", (event) => {
	position[0] = event.clientX
	position[1] = event.clientY
})

use(() => {
	display.textContent = position.join(", ")
})
```

## `use(template, options)`

You can override the default behaviour for a template.

```javascript
const count = use(0)
const doubled = use(() => count * 2, { lazy: true })
const position = use([0, 0], { store: false })
const increment = use(() => count++, { dynamic: false })
```

| Option    | Description                                                 | Default |
| --------- | ----------------------------------------------------------- | ------- |
| `dynamic` | The signal's template is run as a function when it updates. | `false` |
| `lazy`    | The signal only updates when you read it.                   | `false` |
| `store`   | The signal's properties can be accessed as signals.         | `false` |

By default, options are inferred from the template.

| Template       | `dynamic` | `lazy`  | `store` |
| -------------- | --------- | ------- | ------- |
| Function       | `true`    | `false` | `false` |
| Array / Object | `false`   | `false` | `true`  |
| Value          | `false`   | `false` | `false` |
