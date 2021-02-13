<img align="right" height="100" src="http://todepond.com/IMG/CleanTode.png">

# Habitat
I'm remaking my javascript library, using the [Frogasaurus](https://github.com/l2wilson94/Frogasaurus) template.

# How to use it
You can embed it, like this:
```html
<script src="habitat-embed.js"></script>
```
Or import it like this:
```js
import Habitat from "./habitat-import.js"
```
Before you use it, you need to run the `install` function (which takes your global object as an argument):
```js
Habitat.install(window)
```
Alternatively, you can choose to install specific parts of the library. This just installs the console features:
```
Habitat.Console.install(window)
```
Or, you can import specific global functions:
```
import {print} from "./habitat-import.js"
```
There are more examples of how to use Habitat in the `examples` folder.

