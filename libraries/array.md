# Array

## `Array.prototype.at(position)`

Shortcut for getting elements at different positions of an array. Negative numbers go backwards from the end of the array.

```javascript
const scores = [2, 3, 5]
scores.at( 1) //3
scores.at(-1) //5
```

## `Array.prototype.clone`

Gets a clone of the array.

```javascript
const scores = [2, 3, 5]
const clone = scores.clone
clone[1] = 4
scores //[2, 3, 5]
clone  //[2, 4, 5]
```

## `Array.prototype.last`

Shortcut for getting the last element in an array.

```javascript
const scores = [2, 3, 5]
scores.last //5
```

## `Array.prototype.shuffle()`

Shuffle an array in place.

```javascript
const scores = [2, 3, 5]
scores.shuffle()
scores //[2, 3, 5] in a random order
```

## `Array.prototype.trim()`

Remove `undefined` elements from the end of an array (in-place).

```javascript
const scores = [2, 3, 5, undefined, undefined]
scores.trim()
scores //[2, 3, 5]
```

## `Array.prototype.repeat(n)`

Repeat the contents of an array `n` times (in-place). Negative values of `n` also reverse the array.

```javascript
const scores = [2, 3, 5]
scores.repeat(2)
scores //[2, 3, 5, 2, 3, 5]
```
