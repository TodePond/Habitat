# Linked List

## `new LinkedList(iterable = [])`
Make a linked list.
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
Iterate through the linked list.
```javascript
const scores = new LinkedList([3, 2, 5])
for (const score of scores) {
    print(score)
}
```

## `.toString()`
Convert the linked list to a string.
```javascript
const scores = new LinkedList([3, 2, 5])
print(scores) //"3,2,5"
```

## `.push(...values)`
Add `values` to the end of the linked list. 
```javascript
const scores = new LinkedList()
scores.push(3) //3
scores.push(2) //3, 2
```

## `.pop()`
Remove a value from the end of the linked list.
```javascript
const scores = new LinkedList([3, 2, 5])
scores.pop() //3, 2
scores.pop() //3
```

## `.shift()`
Remove a value from the front of the linked list.
```javascript
const scores = new LinkedList([3, 2, 5])
scores.shift() //2, 5
scores.shift() //5
```

## `.clear()`
Remove all values from the linked list.
```javascript
const scores = new LinkedList([3, 2, 5])
scores.clear()
```

## `.setStart(link)`
Set where the linked list starts.
```javascript
const scores = new LinkedList([3, 2, 5])
scores.setStart(scores.start.next) //2, 5
```
