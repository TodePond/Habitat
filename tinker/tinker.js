Habitat.install(window)

window.age = 0

tween("age", {from: 0, to: 10, over: 1000}).d



setInterval(() => {
	print(window.age)
}, 1000 / 60)