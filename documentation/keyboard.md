# Keyboard

## `getKeyboard()`

Get an object that tracks the state of every key.

| Value       | Meaning                      |
| ----------- | ---------------------------- |
| `true`      | Key is down                  |
| `false`     | Key is up                    |
| `undefined` | Key has not been pressed yet |

```javascript
const keyboard = getKeyboard()
if (keyboard["Enter"]) print("The enter key is pressed down")
```

## `keyDown(key)`

An event that fires whenever `key` is pressed.

```javascript
on(keyDown("Enter"), () => print("The enter key was pressed")
```

## `keyUp(key)`

An event that fires whenever `key` is released.

```javascript
on(keyUp("Enter"), () => print("The enter key was released")
```
