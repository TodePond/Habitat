# Event

## `EventTarget.prototype.on`

A proxy for adding event listeners.

```javascript
on.keydown(e => print(e.key))
button.on.click(() => print("Hello button!"))
```

## `EventTarget.prototype.trigger(eventName, options)`

Fires an event.

```javascript
// Trigger a button click
$("button").trigger("click")

// Trigger a custom event called 'greet' with custom data
trigger("greet", {name: "world"})
```

