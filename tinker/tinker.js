Habitat.install(window);

const lu = {
	score: 0
}

const max = 100
let tickTock = true
setInterval(() => {
	if (lu.score === max) return
	print(`${tickTock? "+" : "-"}${"#".repeat(lu.score)}`)
	tickTock = !tickTock
}, 20)

lu.tween("score", {to: max, easy: Habitat.Tween.SUPER_SMOOTH, launch: 0.0, land: 0.0})

