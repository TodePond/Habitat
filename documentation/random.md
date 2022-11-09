# Random

## `random()`
Get a random positive integer.
```javascript
random() //Random number between 0 and 4,294,967,295
```

## `randomFrom(array)`
Get a random value from an `array`.
```javascript
randomFrom([3, 2, 5]) //Randomly 3, 2 or 5
```

## `maybe(chance)`
Randomly returns true or false. `chance` specifies the chance of true returning.
```javascript
if (maybe(0.5)) {
	print("There is a 50% chance of this message sending.")
}
```

## `oneIn(times)`
Randomly returns true or false. `times` specifies how often true should return.
```javascript
if (oneIn(3)) {
	print("There is a 1 in 3 chance of this message sending.")
}
```