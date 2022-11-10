# Console

## `print(message)`
Shorthand for printing a `message` to the console.
```javascript
print("Hello world!")
```

## `print9(message)`
Print a `message` to the console. Only works the first 9 times you run it. Useful when you want to debug something in a loop, but not clog up the console.
```javascript
for (let i = 0; i < 100; i++) {
    print9("This message prints 9 times")
}
```

## `registerDebugMethods(global)`
Register the following methods.
```javascript
registerDebugMethods()
```

#### `Object.prototype.d`
Print the `Object` to the console. Return the value of the object. Useful for quick debugging.
```javascript
"Hello world!".d
```

#### `Object.prototype.d9`
Print the `Object` to the console. Return the value of the object. Only works the first 9 times you run it. Useful when you want to debug something in a loop, but not clog up the console.
```javascript
for (let i = 0; i < 100; i++) {
    "This message prints 9 times".d9
}
```
