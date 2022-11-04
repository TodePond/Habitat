# This branch is a work-in-progress rewrite

<img align="right" height="100" src="http://todepond.com/IMG/Habitat@0.25x.png">

# Habitat
Habitat is a collection of JavaScript helpers that I use in my hobby projects.<br>
A list of its functions is in the [documentation](https://todepond.gitbook.io/habitat).

## How to use it
You can embed it, like this:
```html
<script src="habitat-embed.js"></script>
<script>
  const { print } = Habitat
  print("Hello world!")
</script>
```
Or import it like this:
```js
import { print } from "./habitat-import.js"
print("Hello world!")
```

## How to build it
If you want to help develop Habitat, you can build it with [Frogasaurus](https://github.com/TodePond/Frogasaurus).
