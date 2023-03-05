# Signal

## `use(template, options?)`

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

# Signal Reference

## `new Signal(template, options)`

Create a new signal with the following options.

| Option    | Description                                                   | Default |
| --------- | ------------------------------------------------------------- | ------- |
| `dynamic` | The signal's `template` is run as a function when it updates. | `false` |
| `lazy`    | The signal only updates when you read it manually.            | `false` |
| `store`   | The signal's properties can be accessed as signals.           | `false` |

## `use(template, options?)`

The `use` function is a helper that assumes some default `options` based on the `template`.

| Template Type   | `dynamic` | `lazy`  | `store` |
| --------------- | --------- | ------- | ------- |
| Function        | `true`    | `false` | `false` |
| Array or object | `false`   | `false` | `true`  |
| Everything else | `false`   | `false` | `false` |

You can always override the defaults by passing your own `options`.

```javascript
const count = use(0)
const double = use(() => count.get() * 2, { lazy: true })
print(double.get()) //2
```
