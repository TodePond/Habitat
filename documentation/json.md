# JSON

## `_(...value)`
Convert a `value` to JSON.
```javascript
const places = new Map()
places.set(_(3, 2), "pond")
places.get(_(3, 2)) //"pond"
```