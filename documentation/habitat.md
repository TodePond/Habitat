# Habitat

These functions are used internally by Habitat.
<br>You can use them too.

## `defineGetter(object, name, get)`
Define a getter property on an `object`.
```javascript
const player = {number: 1}

defineGetter(player, "name", function() {
	return `Player ${this.number}`
})

print(player.name) //"Player 1"
```

The getter can be overriden.
```javascript
player.name = "Lu"
print(player.name) //"Lu"
```