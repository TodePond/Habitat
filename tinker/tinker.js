Habitat.install(window)

window.age = 0

tween("age", {from: 0, to: 60, over: 1000, launch: 0.0, land: 1.0})


let tickTock = true
setInterval(() => {
	if (age >= 60) return
	if (tickTock) print("=".repeat(window.age))
	else print("-".repeat(window.age))
	tickTock = !tickTock
	
}, 1000 / 60)