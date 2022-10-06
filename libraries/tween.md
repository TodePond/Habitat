# Tween

## `Object.prototype.tween(name, options)`

**NOTE: This function is currently being changed and may be different to what is specified here.**

Gradually change the value of a property.

```javascript
const plant = {height: 3}
plant.tween("height", {to: 5})
plant.tween("height", {from: 0, to: 10, over: 2000})
plant.tween("height", {to: 100, launch: 0.5, land: 0.0})
```

| Option   | Value                                                          | Default                      |
| -------- | -------------------------------------------------------------- | ---------------------------- |
| `from`   | What value should the property change from?                    | The property's current value |
| `to`     | What value should the property change to?                      | The property's current value |
| `over`   | How many milliseconds should the change take?                  | `1000`                       |
| `launch` | What should the launch speed be? (values between 0.0 and 1.0)  | `1.0`                        |
| `land`   | What should the landing speed be? (values between 0.0 and 1.0) | `1.0`                        |
