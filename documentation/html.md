# HTML

## `HTML(source)`
Make elements with `HTML`.
```js
const canvas = HTML("<canvas></canvas>")
```
```js
const greeting = HTML(`
	<h1>Greeting</h1>
	<p>Hello world!</p>
`)

document.body.append(greeting)
```