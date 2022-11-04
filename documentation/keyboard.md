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

## `onKeyDown(key, func)`
Add an event listener for when `key` is pressed down.
```js
onKeyDown("Enter", () => print("The enter key was pressed down"))
```

## `onKeyUp(key, func)`
Add an event listener for when `key` is released.
```js
onKeyUp("Enter", () => print("The enter key was released"))
```