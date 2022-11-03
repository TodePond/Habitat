# Habitat

These functions are used internally by Habitat.
<br>You can use them too.

## `defineGetter(object, name, get)`
Define a getter property on an `object`.
```js
const player = {number: 1}

defineGetter(player, "name", function() {
	return `Player ${this.number}`
})

print(player.name) //"Player 1"
```

The getter can be overriden.
```js
player.name = "Lu"
print(player.name) //"Lu"
```