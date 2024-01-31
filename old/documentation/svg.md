# SVG

## `SVG(source)`

Make elements with SVG.

```javascript
const container = SVG("<svg></svg>")
const rectangle = SVG(`<rect width="100" height="100" fill="${GREEN}" />`)
container.append(rectangle)
```

```javascript
const stage = new Stage({ context: "svg" })
stage.start = (svg) => {
	const rectangle = SVG(`<rect width="100" height="100" fill="${GREEN}" />`)
	svg.append(rectangle)
}
```
