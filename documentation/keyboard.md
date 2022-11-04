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