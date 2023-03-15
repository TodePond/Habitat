# Signal

You can make a signal with the `use` function.
<br>Check out the [Use](use.md) documentation for info.

## `.value`

Get and set the value of a signal.

```javascript
const count = use(0)
count.value //0
count.value = 1
count.value //1
```

## `.get()`

## `.set(value)`

Get and set the value of a signal.

```javascript
const count = use(0)
count.get() //0
count.set(1)
count.get() //1
```

## `()`

## `(value)`

Get and set the value of a signal.

```javascript
const count = use(0)
count() //0
count(1)
count() //1
```

## `*[Symbol.iterator]`

Get and set the value of a signal.

```javascript
const [getCount, setCount] = use(0)
getCount() //0
setCount(1)
getCount() //1
```

## `.valueOf()`

## `.toString()`

Coerce a signal to a value.

```javascript
const count = use(0)
const doubled = count * 2
```

```javascript
const name = use("Lu")
const greeting = `Hello ${name}`
```

## `.dispose()`

Dispose of a signal.

```javascript
const count = use(0)
const log = use(() => print("Count updated"))
count.value++ //Count updated
count.value++ //Count updated
log.dispose()
count.value++
```

## `.update()`

Manually update a signal. This automatically fires when you get a value anyway.

```javascript
const greet = use(() => print(`Hello world!`), { lazy: true })
greet.update() //Hello world!
```

## `.glueTo(object, key)`

Glue a signal to an object as a property.

```javascript
const player = {}
const score = use(0)
score.glueTo(player, "score")
player.score = 1
print(score.value) //1
```

## `glue(target, source = target)`

Glue all signal properties of a `source` object to a `target` object.

```javascript
const player = {
	score: use(0),
}
glue(player)
player.score = 1
print(player.score) //1
```
