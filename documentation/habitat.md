# Habitat

## `registerMethods()`
Register all methods:
* `registerDebugMethods` from [Console](console.md)
* `registerColourMethods` from [Colour](colour.md)
* `registerVectorMethods` from [Vector](vector.md)

```javascript
Habitat.registerMethods()
"Hello world!".d
```

## `registerGlobals()`
Register all Habitat exports to the global scope.
```javascript
Habitat.registerGlobals()
print("Hello world!")
```

## `registerEverything()`
Register all globals and methods.
```javascript
Habitat.registerEverything()
print("Hello world!")
"Hello world!".d
```
