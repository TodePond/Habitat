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
/*
const hello = Term.string("hello")
const world = Term.string("world")
const digit = Term.regExp(/[0-9]/)

const ruGreeting = Term.list([hello, hello, hello])
const myGreeting = Term.list([ruGreeting, world])

const ribbit = Term.emit(myGreeting, ([[h1, h2], w]) => h2.output)

const hi = Term.string("hi")
const greet = Term.or([hello, hi])
const greetFormal = Term.except(greet, [hi])

const space = Term.string(" ")
const gap = Term.many(space)


const ha = Term.string("ha")
const laughter = Term.many(ha)

const haGreeting = Term.list([laughter, gap, world])

const three = Term.check(digit, (d) => d.output === "3")

const luke = Term.string("Luke")
const name = Term.error(luke, (n) => `Unrecognised name: '${n.input}'`)


const greeting = Term.list([greet, gap, name, Term.eof])

const expression = Term.error(greeting, (e) => `Unrecognised expression: '${e.input}'`)
*/
/*
const anything = Term.regExp(/[^]/)
const digit = Term.regExp(/[0-9]/)
const numberLiteral = Term.many(digit)
const gap = Term.many(Term.regExp(/[ 	]/))
const number = Term.or([])
const numberExceptAdd = Term.except(number, [])
const add = Term.list([numberExceptAdd, Term.string("+"), number])
number.terms = [add, numberLiteral]
numberExceptAdd.exceptions = [add]

const expression = Term.or([number])
const language = Term.list([number, Term.eof])

const strip = Term.emit(Term.many(anything), (a) => a.output.trim())
const stripLanguage = Term.translate(strip, language)
*/

const hello = MotherTode `"Hello"`
const letter = MotherTode `/[a-zA-Z]/`
//const name = MotherTode `Name`
const greeting = MotherTode `"Hello" "world" "!"`
const ribbit = MotherTode `(
	"Hello world!"
)`

const ribbit2 = MotherTode `(
	(
		"Hi"
	)
)`


