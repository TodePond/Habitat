<img align="right" height="100" src="http://todepond.com/IMG/CleanTode.png">

# Habitat
I'm remaking my javascript library, using the [Frogasaurus](https://github.com/l2wilson94/Frogasaurus) template.

# How to use it
You can embed it, like this:
```html
<script src="https://deno.land/x/habitat/build/build-embed.js"></script>
```
Or import it like this:
```js
import Habitat from "https://deno.land/x/habitat/build/build-import.js"
```
Before you use it, you need to run the `install` function (which takes your global object as an argument):
```js
Habitat.install(window)
```
There are more examples of how to use Habitat in the `examples` folder.
