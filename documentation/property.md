# Property

## `defineGetter(object, name, get)`
Define a getter property on an `object`.
```javascript
const player = {number: 1}

defineGetter(player, "name", function() {
	return `Player ${this.number}`
})

print(player.name) //"Player 1"
```

You can override the getter.
```javascript
player.name = "Lu"
print(player.name) //"Lu"
```