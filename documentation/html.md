# HTML

## `HTML(source)`
Make elements with `HTML`.
```javascript
const canvas = HTML("<canvas></canvas>")
```
```javascript
const greeting = HTML(`
	<h1>Greeting</h1>
	<p>Hello world!</p>
`)

document.body.append(greeting)
```