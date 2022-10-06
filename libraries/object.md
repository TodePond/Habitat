# Object

## `Object.prototype.values()`

Get an iterator of the object's values.

```javascript
const scores = {luke: 3, bob: 5}
for (const score of scores.values()) {
    print(score) //3, 5
}
```

## `Object.prototype.keys()`

Gets an iterator of the object's keys.

```javascript
const scores = {luke: 3, bob: 5}
for (const name of scores.keys()) {
    print(name) //"luke", "bob"
}
```

## `Object.prototype.entries()`

Gets an iterator of the object's entries.

```javascript
const scores = {luke: 3, bob: 5}
for (const [name, score] of scores.entries()) {
    print(name)  //"luke", "bob"
    print(score) //3, 5
}
```

## `Object.prototype.map(func)`

Map a function over an object's properties, returning a new object.

```javascript
const scores = {luke: 3, bob: 5}
scores.map(v => v * 2) //{luke: 6, bob: 10}
```
