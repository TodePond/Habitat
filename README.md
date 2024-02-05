<img align="right" height="100" src="http://img.todepond.com/IMG/Habitat@0.25x.png">

# Habitat

Habitat is a bunch of jumpyscript helpers that I use in my projects.

## How to use it

Import from it.

```html
<script type="module">
  import { print } from "./habitat.js";
  print("Hello world!");
</script>
```

If you want to embed it instead, just Ctrl+F and delete every `export` in the file. Then...

```html
<script src="habitat.js">
  print("Hello world!")
</script>
```
