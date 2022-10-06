# JavaScript

## `JS(source)`

Evaluate a string of JavaScript.

```javascript
const score = JS("2 + 3")
const greet = JS(`() => {
    print("Hello world!")
    print("Your score is: ${score}")
}`)
```

