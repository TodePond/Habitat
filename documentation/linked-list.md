# Linked List

## `new LinkedList(iterable = [])`
Make a `LinkedList`.
```javascript
const scores = new LinkedList([3, 2, 5])
```

## Properties
| Name      | Description                              |
| --------- | ---------------------------------------- |
| `start`   | The link at the start of the linked list |
| `end`     | The link at the end of the linked list   |
| `isEmpty` | Is the linked list empty or not?         |

## `[Symbol.iterator]()`
Iterate through the `LinkedList`.
```javascript
const scores = new LinkedList([3, 2, 5])
for (const score of scores) {
    print(score)
}
```

## `.toString()`

```javascript
const scores = new LinkedList([3, 2, 5)
print(scores) //"3,2,5"
```

## `.push(value)`

```javascript
const scores = new LinkedList()
scores.push(3) //3
scores.push(2) //3, 2
```

## `.pop()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.pop() //3, 2
scores.pop() //3
```

## `.shift()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.shift() //2, 5
scores.shift() //5
```

## `.clear()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.clear()
```

## `.setStart(link)`

```javascript
const scores = new LinkedList([3, 2, 5])
scores.setStart(scores.start.next) //2, 5
```