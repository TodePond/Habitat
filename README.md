<img align="right" height="100" src="http://todepond.com/IMG/frogasaurus.jpg">

# Frogasaurus
Frogasaurus is a template for making a javascript project.<br>
It lets you make a project that is compatible with traditional HTML script tag imports, as well as ES module imports.<br>

# How does it work?
Write your code inside the `source` folder.<br>
Then run the `make.js` file with [Deno](https://deno.land).<br>
Your bundled project will appear inside the `build` folder.

By the way, you could use this command to run the `make.js` file securely:
```
deno run --allow-read=. --allow-write=. make.js
```

Or you could use this command to make an executable `make.exe` program:
```
deno compile --unstable --allow-read=. --allow-write=. make.js
```

# Flags
You can give flags to your source files, so that Frogasaurus knows what to do with them.<br>
For example, a file named `greet.js` has no flags.<br>
You can name it `greet-module.js` instead, to give it the `module` flag.<br>
Files can have multiple flags. For example, `greet-footer-module.js` has the `footer` and `module` flags.

These are the different flags you can use:
| Flag | Description | 
|----------|------------------------------------------------------|
| `module` | The code in this file is only inserted into modules. | 
| `header` | The code in this file is placed at the start.        |
| `footer` | The code in this file is placed at the end.          |

# Examples
There are examples in the `examples` folder to show you how to use your bundled project.<br>
