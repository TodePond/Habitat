# Options

## `new Options(definition)`

Make a template for an options argument.<br>

| Option       | Type      | Description                            |
| ------------ | --------- | -------------------------------------- |
| `default`    | String    | The name of the default option.        |
| `isDefault`  | Function  | Is the value the default option?       |
| `...options` | Functions | Get the default value for each option. |

```js
const Player = new Options({
	default: "health",
	isDefault: (v) => typeof v === "number",
	health: () => 10,
	score: () => 0,
})

const player1 = Player(20) // { health: 20, score: 0 }
const player2 = Player() // { health: 10, score: 0 }
const player3 = Player({ score: 10 }) // { health: 10, score: 10 }
const player4 = Player({ health: 20, score: 10 }) // { health: 20, score: 10 }
const player5 = Player(20, { score: 10 }) // { health: 20, score: 10 }
```
