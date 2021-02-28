// Use this file to tinker with the project
Habitat.install(window)
/*const luke = {name: "Luke", age: 27, scores: [2, 3, 5]}
const scores = [2, 3, 5]

const name = "Luke"
const age = 27

const fluke = {name: "Luke", age: 27, scores: [2, 3, 5]}
*/
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
hello("hello").log()
const world = Term.string("world")
world("world").log()
const digit = Term.regExp(/[0-9]/)
digit("27").log()

const ruGreeting = Term.list([hello, hello, hello])
ruGreeting("hellohellohello").log()
const myGreeting = Term.list([ruGreeting, world])
myGreeting("hellohellohelloworld").log()

const ribbit = Term.emit(myGreeting, ([[h1, h2], w]) => h2.output)
ribbit("hellohellohelloworld").log()

const hi = Term.string("hi")
const greet = Term.or([hello, hi])
greet("hi").log()

const greetFormal = Term.except(greet, [hi])
greetFormal("hello").log()
greetFormal("hi").log()

const space = Term.string(" ")
const gap = Term.many(space)
gap("   ").log()

const ha = Term.string("ha")
const laughter = Term.many(ha)
laughter("hahaha").log()

const haGreeting = Term.list([laughter, gap, world])
haGreeting("hahaha world").log()

const three = Term.check(digit, (d) => d.output === "3")
three("4").log()
three("3").log()

const luke = Term.string("Luke")
const name = Term.error(luke, (n) => `Unrecognised name: '${n.input}'`)
name("Luke").log()
name("Bob").log()

const greeting = Term.list([greet, Term.maybe(gap), luke, Term.eof])
greeting("hello Luke").log()
greeting("hi Luke").log()

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
/*
const hello = MotherTode `"Hello"`
hello("Hello").log()

const letter = MotherTode `/[a-zA-Z]/`
letter("a").log()

const greeting = MotherTode `"Hello" " " "world" "!"`
greeting("Hello world!").log()

const hey = MotherTode `
	"Hey"
`
hey("Hey").log()

const ribbit = MotherTode `
	"Hello world!"
	"Ribbit"
	"Ok"
	(
		"Yo"
	)
	"Oh" "Lol"
`.log()
ribbit("Hello world!RibbitOkYoOhLol").log()

const ribbit2 = MotherTode `(
	(
		"Hi"
	)
)`
ribbit2("Hi").log()

const h_ello = MotherTode `"Hello" ("there" "yo") "hi"`
h_ello("Hellothereyohi").log()

const laugh = MotherTode `"ha"+`
laugh("haha").log()

const yoho = MotherTode `("yo" "ho")+`
yoho("yohoyoho").log()

const hiya = MotherTode `"hi" "ya"?`
hiya("hi").log()
hiya("hiya").log()

const hiyaya = MotherTode `"hi" ["ya" "ya"]`
hiyaya("hi").log()
hiyaya("hiyaya").log()

const hiyaa = MotherTode `"hi" "ya"*`
hiyaa("hi").log()
hiyaa("hiya").log()
hiyaa("hiyaya").log()

const hiyayo = MotherTode `"hi" {
	"ya"
	"yo"
}`
hiyayo("hi").log()
hiyayo("hiyayo").log()
hiyayo("hiyayoyayo").log()

const hellohi = MotherTode `<"hello" "hi">`
*/
/*
const scope = {}
scope.Literal = Term.many(Term.regExp(/[0-9]/))
scope.Number = Term.or([
	Term.term("Add", scope),
	Term.term("Subtract", scope),
	//Term.term("Multiply", scope),
	//Term.term("Divide", scope),
	Term.term("Literal", scope),
])

scope.Add = Term.list([
	Term.except(Term.term("Number", scope), [Term.term("Add", scope)]),
	Term.string("+"),
	Term.term("Number", scope),
])

scope.Subtract = Term.list([
	Term.except(Term.term("Number", scope), [Term.term("Subtract", scope)]),
	Term.string("-"),
	Term.term("Number", scope),
])

scope.Multiply = Term.list([
	Term.except(Term.term("Number", scope), [Term.term("Multiply", scope)]),
	Term.string("*"),
	Term.term("Number", scope),
])

scope.Divide = Term.list([
	Term.except(Term.term("Number", scope), [Term.term("Divide", scope)]),
	Term.string("/"),
	Term.term("Number", scope),
])*/

const hello = MotherTode `"hello"`
hello("hello").log()

const digit = MotherTode `/[0-9]/`
digit("3").log()

const yohoho = MotherTode `"yo" "ho" "ho"`
yohoho("yohoho").log()

const group = MotherTode `("hi" "ya")`
group("hiya").log()

const groupyo = MotherTode `"hi" ("yo")`
groupyo("hiyo").log()

const groupgroup = MotherTode `("hi" ("yo" "yi") "ya") ("lol")`
groupgroup("hiyoyiyalol").log()

const indent = MotherTode `(
	"hello" (
		"there"
		"lol"
	)
	"ha"
)`
indent("hellotherelolha").log()

const inner = MotherTode `
	"hi"
	"yo" "ya"
`
inner("hiyoya").log()

const hahaha = MotherTode `"ha"+`
hahaha("ha").log()
hahaha("haha").log()
hahaha("hahaha").log()

const hiya = MotherTode `"hi" "ya"?`
hiya("hi").log()
hiya("hiya").log()

const hiyaya = MotherTode `"hi" ["ya" "ya"]`
hiyaya("hi").log()
hiyaya("hiyaya").log()

const hiyayaya = MotherTode `"hi" "ya"*`
hiyaya("hi").log()
hiyaya("hiya").log()
hiyaya("hiyaya").log()

const hiyoyo = MotherTode `"hi" {"yo"}`
hiyoyo("hi").log()
hiyoyo("hiyo").log()
hiyoyo("hiyoyo").log()

const hillo = MotherTode `<
	"hi"
	"hello"
>`
hillo("hi").log()
hillo("hello").log()

const hei = MotherTode `"hi" | "hello" | "hey"`
hei("hi").log()
hei("hello").log()
hei("hey").log()

const nohi = MotherTode `"hello" except "hi"`
nohi("hello").log()

const anyhi = MotherTode `any "hi"`
anyhi("hi").log()
