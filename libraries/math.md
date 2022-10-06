# Math

## `Math.gcd(...numbers)`

Finds the greatest common divisor from some numbers.

```javascript
Math.gcd(10, 15, 35) //5
```

## `Math.reduce(...numbers)`

Reduce some numbers down to their smallest, while still keeping the same ratio between their sizes.

```javascript
Math.reduce(3, 9, 6) //[1, 3, 2]
```

## `Math.wrap(number, min, max)`

Wrap a number around a minimum and maximum value.

```javascript
Math.wrap(-5, 0, 10) //5
Math.wrap( 5, 0, 10) //5
Math.wrap(15, 0, 10) //5
```

## `Math.clamp(number, min, max)`

Wrap a number around a minimum and maximum value.

```javascript
Math.clamp(-5, 0, 10) //0
Math.clamp( 5, 0, 10) //5
Math.clamp(15, 0, 10) //10
```
