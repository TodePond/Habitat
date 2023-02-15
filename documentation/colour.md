# Colour

## `new Colour(red, green, blue, alpha = 255)`

Make a colour.

```javascript
const pink = new Colour(255, 128, 222)
```

Colours can be used as arrays.

```javascript
const [red, green, blue, alpha] = pink
```

Colours can be used as strings.

```javascript
print(`Hex code: ${pink}`)
```

## `new Splash(number)`

Make a colour with a three-digit `number`. The digits represent the red, green and blue channels of the colour.

```javascript
const pink = new Splash(937)
```

## Theme Colours

There are some preset colours.
| Colour | Splash | Value |
| -------- | ------ | -------------------- |
| `VOID` | | `rgb(6, 7, 10)` |
| `BLACK` | 000 | `rgb(23, 29, 40)` |
| `GREY` | 112 | `rgb(55, 67, 98)` |
| `SILVER` | 556 | `rgb(159, 174, 201)` |
| `WHITE` | 999 | `rgb(255, 255, 255)` |
| `GREEN` | 293 | `rgb(70, 255, 128)` |
| `CYAN` | 269 | `rgb(70, 204, 255)` |
| `BLUE` | 239 | `rgb(70, 128, 255)` |
| `PURPLE` | 418 | `rgb(128, 67, 247)` |
| `PINK` | 937 | `rgb(255, 128, 222)` |
| `CORAL` | 933 | `rgb(255, 128, 128)` |
| `RED` | 911 | `rgb(255, 67, 70)` |
| `ORANGE` | 931 | `rgb(255, 128, 70)` |
| `YELLOW` | 991 | `rgb(255, 255, 70)` |

There are some preset arrays of colours.
| Array | Colours
| --------- | -- |
| `SHADES` | `VOID` `BLACK` `GREY` `SILVER` |
| `HUES` | `GREEN` `CYAN` `BLUE` `PURPLE` `PINK` `CORAL` `RED` `ORANGE` `YELLOW` |
| `COLOURS` | All colours |

## `registerColourMethods()`

Register the following methods.

```javascript
registerColourMethods()
```

#### `Array.prototype.red`

Get the first element of an array.

```javascript
const pink = new Colour(255, 128, 222)
print(pink.red) //255
```

#### `Array.prototype.green`

Get the second element of an array.

```javascript
const pink = new Colour(255, 128, 222)
print(pink.green) //128
```

#### `Array.prototype.blue`

Get the third element of an array.

```javascript
const pink = new Colour(255, 128, 222)
print(pink.blue) //222
```

#### `Array.prototype.alpha`

Get the fourth element of an array.

```javascript
const pink = new Colour(255, 128, 222, 255)
print(pink.alpha) //255
```
