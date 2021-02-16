// Use this file to tinker with the project
Habitat.install(window)
const luke = {name: "Luke", age: 27}
const scores = [2, 3, 5]

on.click(e => {
	print("Click")
})

const greeting = HTML `<p>Hello world!</p><p>Ribbit world!</p>`
document.body.appendChild(greeting)

$("p").on.click(e => print("Paragraph"))
