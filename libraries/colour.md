# Colour

## `Colour.make(style)`

Make a colour object.

```javascript
const blue = Colour.make("rgb(0, 128, 255)")
const pink = Colour.make("hotpink")
const red = Colour.make("hsl(120, 100%, 50%)")
```

Colour objects have these read-only properties:

| Property                                                                                                                                                                    | Description                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <p><code>[0, 1, 2, 3]</code><br><code>red</code> <code>green</code> <code>blue</code> <code>alpha</code><br><code>r</code> <code>g</code> <code>b</code> <code>a</code></p> | Red, green, blue and alpha values                                         |
| <p><code>hue</code> <code>saturation</code> <code>lightness</code><br><code>h</code> <code>s</code> <code>l</code></p>                                                      | Hue, saturation and lightness values                                      |
| <p><code>toString()</code><br><code>hex</code></p>                                                                                                                          | <p>A hex string</p><p>eg: <code>"#ffcc46"</code></p>                      |
| `rgb`                                                                                                                                                                       | <p>An RGB string<br>eg: <code>"rgb(255, 204, 70)"</code></p>              |
| `hsl`                                                                                                                                                                       | <p>An HSL string<br>eg: <code>"hsl(43, 100%, 63%)"</code></p>             |
| `brightness`                                                                                                                                                                | Brightness of the colour (subjective)                                     |
| `isBright`                                                                                                                                                                  | Is the colour too light to be visible on a light background? (subjective) |
| `isDark`                                                                                                                                                                    | Is the colour too dark to be visible on a dark background? (subjective)   |
| `splash`                                                                                                                                                                    | The colour's closest splash number (see below for more info)              |

## `Colour.add(left, right)`

Add two colours together.

```javascript
const lightBlue = Colour.add(Colour.Blue, {lightness: 20})
const darkBlue = Colour.add(Colour.Blue, {lightness: -20})
```

## `Colour.multiply(left, right)`

Multiply two colours together.

```javascript
const lightBlue = Colour.multiply(Colour.Blue, {lightness: 1.3})
const darkBlue = Colour.multiply(Colour.Blue, {lightness: 0.5})
```

## In-Built Colours

There are some in-built colours that you can use. Check them out at [colour.todepond.cool](https://colour.todepond.cool) (click on a colour to copy it to your clipboard).

| Colour          | Value                |
| --------------- | -------------------- |
| `Colour.Void`   | `rgb(6, 7, 10)`      |
| `Colour.Black`  | `rgb(23, 29, 40)`    |
| `Colour.Grey`   | `rgb(55, 67, 98)`    |
| `Colour.Silver` | `rgb(159, 174, 201)` |
| `Colour.White`  | `rgb(242, 245, 247)` |
| `Colour.Green`  | `rgb(70, 255, 128)`  |
| `Colour.Red`    | `rgb(255, 70, 70)`   |
| `Colour.Blue`   | `rgb(70, 128, 255)`  |
| `Colour.Yellow` | `rgb(255, 204, 70)`  |
| `Colour.Orange` | `rgb(255, 128, 70)`  |
| `Colour.Pink`   | `rgb(255, 128, 128)` |
| `Colour.Rose`   | `rgb(255, 128, 204)` |
| `Colour.Cyan`   | `rgb(70, 204, 255)`  |
| `Colour.Purple` | `rgb(128, 70, 255)`  |

## Splash

You can also make a colour with a **splash** number.

A splash is a three-digit number that represents a colour. The digits represent the red, green and blue values of the colour. All colours in the TodePond theme can be represented by splashes.

```javascript
const black = Colour.make(000)
const green = Colour.make(293)
```

## `Colour.splash(number)`

Get a colour from a splash number.

The first time you use this function, it generates a cache of all splash numbers, which will take a bit of time. After the first go, it retrieves the colour from the cache, which should be quick.

```javascript
const white = Colour.splash(888) //slow...
const black = Colour.splash(000) //faster!
```
