# Colour

## `new Colour(red, green, blue)`
Make a colour.
```javascript
const pink = new Colour(255, 128, 222)
```

Colours can be used as arrays.
```javascript
const [red, green, blue] = pink
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
| Colour   | Value                |
| -------- | -------------------- |
| `VOID`   | `rgb(6, 7, 10)`      |
| `BLACK`  | `rgb(23, 29, 40)`    |
| `GREY`   | `rgb(55, 67, 98)`    |
| `SILVER` | `rgb(159, 174, 201)` |
| `WHITE`  | `rgb(255, 255, 255)` |
| `GREEN`  | `rgb(70, 255, 128)`  |
| `CYAN`   | `rgb(70, 204, 255)`  |
| `BLUE`   | `rgb(70, 128, 255)`  |
| `PURPLE` | `rgb(128, 67, 247)`  |
| `PINK`   | `rgb(255, 128, 222)` |
| `CORAL`  | `rgb(255, 128, 128)` |
| `RED`    | `rgb(255, 67, 70)`   |
| `ORANGE` | `rgb(255, 128, 70)`  |
| `YELLOW` | `rgb(255, 255, 70)`  |

There are some preset arrays of colours.
| Array     | Colours
| --------- | -- |
| `SHADES`  | `VOID` `BLACK` `GREY` `SILVER` |
| `HUES`    | `GREEN` `CYAN` `BLUE` `PURPLE` `PINK` `CORAL` `RED` `ORANGE` `YELLOW`  |
| `COLOURS` | All colours |