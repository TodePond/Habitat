# Lerp

## `lerp([a, b], interpolation)`

Interpolate along a line.

```javascript
lerp([0, 4], 0.5) //2
```

```javascript
const line = [
	[0, 0],
	[2, 4],
]

lerp(line, 0.5) //[1, 2]
```

## `bilerp([a, b, c, d], interpolation)`

Interpolate within a quadrilateral.

```javascript
const quadrilateral = [0, 2, 4, 0]
bilerp(quadrilateral, [0.5, 0.5]) //1.5
```

```javascript
const quadrilateral = [
	[0, 0],
	[1, 2],
	[2, 4],
	[0, 0],
]

bilerp(quadrilateral, [0.5, 0.5]) //[0.75, 1.5]
```

## `ibilerp([a, b, c, d], value)`

Find the interpolation amount of a `value` within a quadrilateral.

```javascript
const quadrilateral = [
	[0, 0],
	[1, 0],
	[1, 2],
	[0, 2],
]

ibilerp(quadrilateral, [1.0, 1.0]) //[1, 0.5]
```
