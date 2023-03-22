# State

## `new State(options)`

Make a state for use in a state machine.

| Option           | Type     | Description            |
| ---------------- | -------- | ---------------------- |
| `name` (default) | `string` | The name of the state. |
| `...properties`  | `any`    | Any other properties.  |

```js
const pointing = new State()
```

## `new Machine(initial)`

Make a state machine with an `initial` state.

```js
const pointing = new State()
const machine = new Machine(pointing)
```

## `Machine.prototype.current`

A machine's current state.

```js
const pointing = new State()
const machine = new Machine(pointing)
print(machine.current) // pointing
```

## `Machine.prototype.fire(name, args)`

Fire a method on the current state.<br>
If the method returns a state, transition to it.

```js
const clicked = new State()
const idle = new State({
	click: () => clicked,
})

const machine = new Machine(idle)
machine.fire("click") // Transitions to clicked
```

## `Machine.prototype.transition(state)`

Transition to a new `state`.<br>
This also fires the `enter` and `exit` methods on the states.

```js
const pointing = new State()
const dragging = new State()
const machine = new Machine(pointing)
machine.transition(dragging)
```
