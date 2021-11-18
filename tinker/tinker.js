Habitat.install(window)

window.age = 0

tween("age", {from: 0, to: 150, over: 10000, launch: 0.0, land: 0.0})


let tickTock = true
setInterval(() => {
	//if (age >= 90) return
	if (tickTock) print("=".repeat(window.age))
	else print("-".repeat(window.age))
	tickTock = !tickTock
	
}, 1000 / 60)