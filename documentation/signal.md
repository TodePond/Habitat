# Signal

## `useSignal(value)`

Make a signal that stores a `value`.

```javascript
const count = useSignal(0)
```

You can get and set the signal in various ways.

```javascript
const count = useSignal(0)
count.set(1)
print(count.get()) //1
```

```javascript
const count = useSignal(0)
count.value = 1
print(count.value) //1
```

```javascript
const count = useSignal(0)
count(1)
print(count()) //1
```

```javascript
const [getCount, setCount] = useSignal(0)
setCount(1)
print(getCount()) //1
```

```javascript
const count = useSignal(0)
count.value = 1
print(count.previous) //0
```

## `usePush(get)`

Make a signal that's based on other signals.<br>
It updates whenever one of those signals updates.

```javascript
const count = useSignal(0)
const double = usePush(() => count.get() * 2)

count.set(1)
print(double.get()) //2
```

## `usePull(get)`

Make a signal that's based on other signals.<br>
It updates whenever you read from it (but only if it has to).

```javascript
const count = useSignal(0)
const double = usePull(() => count.get() * 2)

count.set(1)
print(double.get()) //2
```

## `useEffect(callback)`

Make a signal with no value.<br>
It updates immediately, and whenever one of its signals updates.<br>

```javascript
const count = useSignal(0)

const display = HTML("<div></div>")
useEffect(() => {
	display.textContent = count.value
})
```

## `useUpdate([signals], callback)`

Make a signal with no value.<br>
It updates whenever one of its named `signals` updates.

```javascript
const count = useSignal(0)
useUpdate([count], () => print("Count updated!"))
```
