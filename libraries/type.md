# Type

## `Object.prototype.is(type)`

Checks if the object is a certain type. `type` can also be any object with a `check` function as a property.

```javascript
[2, 3, 5].is(Array) //true
"Hello!".is(String) //true
```

## `Object.prototype.as(type)`

Converts the object to a certain type. `type` can also be any object with a `convert` function as a property.

```javascript
(27).as(String) //"27"
"27".as(Number) // 27
```

## Duck Types

There are some objects with preset `check` and/or `convert` functions that you can use.

| Duck Type    | Check                            | Convert                              |
| ------------ | -------------------------------- | ------------------------------------ |
| `Int`        | Number is an integer             | Parse integer                        |
| `Positive`   | Positive number                  | Absolute value of number             |
| `Negative`   | Negative number                  | Inverted absolute value of number    |
| `UInt`       | Positive integer                 | Parse integer and get absolute value |
| `UpperCase`  | String of upper case characters  | All characters to upper case         |
| `LowerCase`  | String of lower case characters  | All characters to lower case         |
| `WhiteSpace` | String of whitespace characters  | None                                 |
| `PureObject` | Constructor is Object            | None                                 |
| `Primitive`  | Number, String, RegExp or Symbol | None                                 |
