Habitat.install(window);

const lu = {
	score: 20
}

const max = 10
const offset = 10
let tickTock = true
setInterval(() => {
	if (lu.score === max) return
	const count = Math.clamp(offset + lu.score, 0, Infinity)
	print(`${tickTock? "+" : "-"}${"#".repeat(count)}`)
	tickTock = !tickTock
}, 20)

lu.tween("score", {to: max, ease: Habitat.Tween.SUPER_SMOOTH})
