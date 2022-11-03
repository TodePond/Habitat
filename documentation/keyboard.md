# Keyboard

## `getKeyboard()`
Get an object that contains the state of every key.
<br>`true` = down
<br>`false` = up
<br>`undefined` = not pressed yet
```js
const keyboard = getKeyboard()
on("click", () => {
	if (keyboard["Enter"]) print("The enter key is pressed down")
})
```