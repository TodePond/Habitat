# Use

You can make a signal with the `use` function.<br>
Check out the [Signal](signal.md) documentation for info.

## `use(value)`

Use state based on a value.

```javascript
const count = use(0)
```

## `use(callback)`

Use state based on other state.

```javascript
const count = use(0)
const doubled = use(() => count * 2)
```

React to state changes.

```javascript
const count = use(0)
use(() => print("Count changed: " + count)
```

## `use(object)`

Use an object made of signal properties.

```javascript
const player = use({ name: "Lu", score: 0 })
const isWinner = use(() => player.score > 9)
```

## `use(array)`

Use an array made of signal items.

```javascript
const position = use([0, 0])
const isUnderground = use(() => position.y > 100)
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
