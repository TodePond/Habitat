# Property

## `defineGetter(object, key, get)`
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

## `defineAccessor(object, key, get, set)`
```javascript
const player = {firstName: "Luke", lastName: "Wilson"}

defineAccessor(
	player,
	"fullName",
	function() {
		return `${this.firstName} ${this.lastName}`
	},
	function(v) {
		const [firstName, lastName] = v.split(" ")
		this.firstName = firstName
		this.lastName = lastName
	},
)

print(player.fullName) //"Luke Wilson"

player.fullName = "Lu Wilson"
print(player.firstName) //"Lu"
```