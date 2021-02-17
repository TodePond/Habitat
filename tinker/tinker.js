// Use this file to tinker with the project
Habitat.install(window)
const luke = {name: "Luke", age: 27}
const scores = [2, 3, 5]


const greeting = HTML `<p>Hello world!</p><p>Ribbit world!</p>`
document.body.appendChild(greeting)


on.click(e => {
	print("Click")
})


on.mousedown(e => print("Doc"))

$("p").on.mousedown(e => print("Paragraph"))
$("p").on.yeet(e => {
	//print("Yeet")
	//print(e)
})
$("p").trigger("yeet", {bubbles: true, target: "big"})

const NONE = (0).flag
const FIRE = (1).flag
const ELECTRIC = (2).flag
const WATER = (3).flag

const foods = new Set(["pasta", "pizza", "pasta", "pancake"])
