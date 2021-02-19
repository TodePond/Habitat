// Use this file to tinker with the project
Habitat.install(window)
/*const luke = {name: "Luke", age: 27}
const scores = [2, 3, 5]

const name = "Luke"
const age = 27*/

/*const greeting = HTML `<p>Hello world!</p><p>Ribbit world!</p>`
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

const stage = Stage.make()
document.body.appendChild(stage.canvas)

stage.draw = () => {
	stage.context.fillStyle = "red"
	stage.context.fillRect(0, 0, 10, 10)
}*/

/*const resulter = Term.result({
    success: true,
    output: "",
    source: "",
    tail: "",
    children: [],
})
resulter("Hello world!").d

const succeeder = Term.succeed({
    output: "",
    source: "",
    tail: "",
    children: [],
})
succeeder("Hi").d*/

const hello = Term.string("hello")
const world = Term.string("world")
const digit = Term.regExp(/[0-9]/)

const ruGreeting = Term.list([hello, hello, hello])
const greeting = Term.list([ruGreeting, world])

const ribbit = Term.emit(greeting, ([[h1, h2], w]) => h2.output)
