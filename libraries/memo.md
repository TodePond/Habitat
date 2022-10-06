# Memoization

## `memo(function, [keyMaker])`

Memoize a function. This caches previous results allowing them to be used.
The `function` argument is any function, but should not modify values outside of it's scope, as these changes will not be repeated when using the cached return value.
The `keyMaker` value is the function used to generate the key that stores the function return in the cache. It's default value is `args.map(JSON.stringify).join('')`, which should work in a large amount of situations. However, it is reccomended to create one that is specific to your use case, for example `(arg1) => arg1` would use the first argument of the function as the key.

```javascript
function longFunction(number) {
    for (let i = 0; i < 100000000; i++) {
        Math.random()
    }

    return number + 1;
}

const memoizedLongFunction = memo(longFunction, (arg1) => arg1)

// First run takes a long time
print(memoizedLongFunction(2))

// Second run is nearly instant
print(memoizedLongFunction(2))

```

