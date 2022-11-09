# Struct

## `struct(properties)`
Make a simple object class.
```javascript
const Player = struct ({
	name: "",
	score: 0,
	health: 10,
})

const lu = new Player({name: "Lu"})
const bob = new Player({name: "Bob", health: 15})
```