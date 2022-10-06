# Number

## `Number.prototype.to(number)`

Makes an iterable from `Number` to `number`.

```javascript
// Print the numbers 1 to 10
for (const i of (1).to(10)) {
    print(i)
}
```

## `Number.prototype.toString(base, size)`

```javascript
;(255).toString(2, 8)   //"11111111"
;(255).toString(16, 2)  //"ff"
;(0xff).toString(2, 16) //"0000000011111111"
```

## `Number.prototype.forEach(number)`

```javascript
;(3).forEach(v => print(v)) //0, 1, 2
```

## `Number.prototype.map(number)`

```javascript
;(3).map(v => v * 2) //[0, 2, 4]
```
