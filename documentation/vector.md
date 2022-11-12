# Vector
Vectors can be 2D or 3D.

## `scaleVector(vector, scale)`
Scale a `vector` by `scale`.
```javascript
scaleVector([3, 4], 2) //[6, 8]
```

## `addVector(a, b)`
Add two vectors together.
```javascript
addVector([3, 2], [1, 4]) //[4, 6]
```

## `subtractVector(a, b)`
Subtract two vectors.
```javascript
subtractVector([4, 3], [1, 2]) //[3, 1]
```

## `crossProductVector(a, b)`
Get the cross product of two vectors.
```javascript
crossProductVector([3, 2], [1, 2]) //4
```
```javascript
crossProductVector([3, 2, 1], [1, 2, 3]) //[4, -8, 4]
```

## `distanceBetweenVectors(a, b)`
Get the distance between two points.
```javascript
distanceBetweenVectors([3, 4], [6, 8]) //5
```

## `angleBetweenVectors(a, b)`
Get the angle between two vectors.
```javascript
angleBetweenVectors([3, 2], [4, 2]) //3.14...
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
```

#### `Array.prototype.y`
Get the second element of an array.
```javascript
const vector = [3, 2, 5]
print(vector.y) //2
```

#### `Array.prototype.z`
Get the third element of an array.
```javascript
const vector = [3, 2, 5]
print(vector.z) //3
```