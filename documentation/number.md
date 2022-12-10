# Number

## `clamp(number, min, max)`
Clamp a `number` between a `min` and `max` value.
```javascript
clamp(5, 0, 10) //5
clamp(15, 0, 10) //10
clamp(-5, 0, 10) //0
```

## `wrap(number, min, max)`
Wrap a `number` around a `min` and `max` value.
```javascript
clamp(5, 0, 10) //5
clamp(15, 0, 10) //5
clamp(-5, 0, 10) //5
```

## `getDigits(number)`
Get an array of a `number`'s digits.
```javascript
getDigits(28) //[2, 8]
```

## `simplifyRatio(...numbers)`
Simplify some `numbers` down to their smallest, maintaining the ratio between their sizes.
```javascript
simplifyRatio(3, 9, 6) //[1, 3, 2]
```

## `gcd(...numbers)`
Find the greatest common divisor of some `numbers`.
```javascript
gcd(10, 15, 35) //5
```

## `range(start, end)`
Iterate between `start` and `end` (inclusive).
```javascript
for (const i of range(10, 0)) {
    print(i)
}

print("Blast off!")
```
