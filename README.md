# This branch is an old version of Habitat, kept for legacy reasons

<img align="right" height="100" src="http://todepond.com/IMG/Habitat@0.25x.png">

# Habitat
Habitat is a collection of JavaScript tools and libraries that I have built up for my personal use. The full documentation for it is here: [todepond.gitbook.io/habitat-legacy](https://todepond.gitbook.io/habitat-legacy/)

## How to use it
You can embed it, like this:
```html
<script src="habitat-embed.js"></script>
```
Or import it like this:
```js
import Habitat from "./habitat-import.js"
```
## How to install it
Before you use it, you need to run the `install` function (which takes your global object as an argument):
```js
Habitat.install(window)
```
Alternatively, you can choose to install specific parts of the library. This just installs the console features:
```js
Habitat.Console.install(window)
```
Or, you can import specific global functions:
```js
import {print} from "./habitat-import.js"
```
There are more examples of how to use Habitat in the `examples` folder.
