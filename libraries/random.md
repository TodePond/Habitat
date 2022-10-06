# Random

## `Random.oneIn(times)`

Randomly returns true or false. `times` specifies how often true should return.

```javascript
if (Random.oneIn(3)) print("There is a 1 in 3 chance of this message sending.")
```

## `Random.maybe(chance)`

Randomly returns true or false. `chance` specifies the chance of true returning.

```javascript
if (Random.maybe(0.5)) print("There is a 50% chance of this message sending.")
```

## `Random.Uint8`

Gets a random Uint8.

```javascript
const result = Random.Uint8 //Random number between 0 and 255
```

## `Random.Uint32`

Gets a random Uint`32`.

```javascript
const result = Random.Uint32 //Random number between 0 and 4,294,967,295
```
