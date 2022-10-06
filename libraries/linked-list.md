# Linked List

## `new LinkedList(iterable)`

```javascript
const scores = new LinkedList([3, 2, 5])
```

## Properties

| Name      | Description                              |
| --------- | ---------------------------------------- |
| `start`   | The link at the start of the linked list |
| `end`     | The link at the end of the linked list   |
| `isEmpty` | Is the linked list empty or not?         |

## `for (const value of linkedList)`

```javascript
const scores = new LinkedList([3, 2, 5])
for (const score of scores) {
    print(score)
}
```

## `LinkedList.prototype.push(value)`

```javascript
const scores = new LinkedList()
scores.push(3) //3
scores.push(2) //3, 2
```

## `LinkedList.prototype.pop()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.pop() //3, 2
scores.pop() //3
```

## `LinkedList.prototype.shift()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.shift() //2, 5
scores.shift() //5
```

## `LinkedList.prototype.clear()`

```javascript
const scores = new LinkedList([3, 2, 5)
scores.clear()
```

## `LinkedList.prototype.setStart(link)`

```javascript
const scores = new LinkedList([3, 2, 5])
scores.setStart(scores.start.next) //2, 5
```

## `LinkedList.prototype.toString()`

```javascript
const scores = new LinkedList([3, 2, 5)
print(scores) //"3,2,5"
```
