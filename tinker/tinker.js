// Use this file to tinker with the project
Habitat.install(window)
const luke = {name: "Luke", age: 27}
const scores = [2, 3, 5]


const greeting = HTML `<p>Hello world!</p><p>Ribbit world!</p>`
document.body.appendChild(greeting)


on.click(e => {
	print("Click")
})

$("p").on.click(e => print("Paragraph"))

document.on.click(e => print("Doc"))