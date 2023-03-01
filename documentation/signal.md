# Signal

## `use(template, options?)`

Make a signal.<br>
Here are some things it can do. (Or scroll to the bottom for a full reference.)

## Value

You can store a value.

```javascript
const count = use(0)
```

You can get and set the value in various ways.

```javascript
const count = use(0)
count.set(1)
print(count.get()) //1
```

```javascript
const count = use(0)
count.value = 1
print(count.value) //1
```

```javascript
const count = use(0)
count(1)
print(count()) //1
```

```javascript
const [getCount, setCount] = use(0)
setCount(1)
print(getCount()) //1
```

```javascript
const count = use(0)
count.value = 1
print(count.previous) //0
```

## Dynamic

You can make a `dynamic` signal by passing a function.<br>
It updates whenever one of its used signals updates.

```javascript
const count = use(0)
const double = use(() => count.get() * 2)

count.set(1)
print(double.get()) //2
```

```javascript
const count = use(0)
const display = HTML("<div></div>")
use(() => {
	display.textContent = count.value
})
```

## Lazy

You can make a `lazy` dynamic signal.<br>
It updates whenever you read from it (but only if it has to).

```javascript
const count = use(0)
const double = use(() => count.get() * 2, { lazy: true })

count.set(1)
print(double.get()) //2
```

## Store

You can make a `store` by passing an object or array.<br>
Its properties are all treated like signals.

```javascript
const position = use([0, 0])
const dimensions = use([10, 10])
const right = use(() => position.x + dimensions.width)

print(right.get()) //10
position.x = 5
print(right.get()) //15
```

```javascript
const player = use({
	health: 10,
	score: 0,
})

const status = use(() => (player.health > 0 ? "alive" : "dead"))

use(() => {
	if (status.value === "dead") {
		print("Game over!")
		print("Score: " + player.score)
	}
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
