# Introduction

![](.gitbook/assets/Habitat@0.5x.png)

Habitat is a collection of JavaScript tools and libraries that I have built up for my personal use.

Its source code is all available here: [github.com/l2wilson94/habitat](https://github.com/l2wilson94/habitat)

## How to use it

You can embed it, like this:

```markup
<script src="habitat-embed.js"></script>
```

Or import it, like this:

```javascript
import Habitat from "./habitat-import.js"
```

## How to install it

Before you use it, you need to run the `install` function (which takes your global object as an argument):

```javascript
Habitat.install(window)
```

Alternatively, you can choose to install specific parts of the library. This just installs the console features:

```javascript
Habitat.Console.install(window)
```

Or, you can import specific global functions:

```javascript
import {print} from "./habitat-import.js"
```

There are more examples of how to use Habitat in the [examples](https://github.com/l2wilson94/Habitat/tree/main/examples) folder.
