# Console

## `print(message)`

Shorthand to print a message to the console.

```javascript
print("Hello world!")
```

## `print9(message)`

Prints a message to the console. Only works the first 9 times you run it. Useful when you want to debug something in a loop, but not clog up the console.

```javascript
for (let i = 0; i < 100; i++) {
    print9("This message prints 9 times")
}
```

## `dir(value)`

Shorthand to reliably print a value to the console as a directory.

```javascript
dir("Hello world!")
```

## `Object.prototype.d`

Prints the `Object` to the console. Returns the value of the object. Useful for quick debugging.

```javascript
"Hello world!".d
```

## `Object.prototype.d9`

Prints the `Object` to the console. Returns the value of the object. Only works the first 9 times you run it.

```javascript
for (let i = 0; i < 100; i++) {
    "This message prints 9 times".d9
}
```

## `Object.prototype.dir`

Prints the `Object` to the console as a directory. Returns the value of the object. Useful for quick debugging.

```javascript
"Hello world!".dir
```
