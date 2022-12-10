# Vector
These functions can be used on numbers, 2D vectors, and 3D vectors (where applicable).

## `scale(value, scale)`
Scale a `value` by `scale`.
```javascript
scale([3, 4], 2) //[6, 8]
```

## `add(a, b)`
Add two values together.
```javascript
add([3, 2], [1, 4]) //[4, 6]
```

## `subtract(a, b)`
Subtract two values.
```javascript
subtract([4, 3], [1, 2]) //[3, 1]
```

## `crossProduct(a, b)`
Get the cross product of two vectors.
```javascript
crossProduct([3, 2], [1, 2]) //4
```
```javascript
crossProduct([3, 2, 1], [1, 2, 3]) //[4, -8, 4]
```

## `distanceBetween(a, b)`
Get the distance between two points.
```javascript
distanceBetween([3, 4], [6, 8]) //5
```

## `angleBetween(a, b)`
Get the angle between two vectors.
```javascript
angleBetween([3, 2], [4, 2]) //3.14...
```

## `registerVectorMethods()`
Register the following methods.
```javascript
registerVectorMethods()
```

#### `Array.prototype.x`
Get the first element of an array.
```javascript
const vector = [3, 2, 5]
print(vector.x) //3

vector.x = 4
print(vector) //[4, 2, 5]
```

#### `Array.prototype.y`
Get the second element of an array.
```javascript
const vector = [3, 2, 5]
print(vector.y) //2

vector.y = 4
print(vector) //[3, 4, 5]
```

#### `Array.prototype.z`
Get the third element of an array.
```javascript
const vector = [3, 2, 5]
print(vector.z) //3

vector.z = 4
print(vector) //[3, 2, 4]
```