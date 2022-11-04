# Memo

## `memo(func)`
Memoise a `func`tion.
```javascript
const fibonacci = memo ((n) => {
	if (n < 2) return 1
	return fibonacci(n-1) + fibonacci(n-2)
})

fibonacci(64) //17167680177565
```
