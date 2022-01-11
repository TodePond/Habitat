//=======//
// SETUP //
//=======//
const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")
canvas.style["background-color"] = Colour.Grey
canvas.style["margin"] = 0

let c = {}
on.load(async () => {

	document.body.style["background-color"] = Colour.Black
	document.body.style["margin"] = 0
	document.body.style["overflow"] = "hidden"
	document.body.appendChild(canvas)
	setInterval(tick, 1000 / 60)
	trigger("resize")
})

//================//
// UI SHENANIGENS //
//================//
on.resize(() => {
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight
	canvas.style["width"] = canvas.width
	canvas.style["height"] = canvas.height
	fullDraw()
})

let paused = false
on.keydown(e => {
	if (e.key === " ") {
		paused = !paused
	}
})

//===========//
// GAME LOOP //
//===========//
/*const reds = [23, 55, 70, 102, 128, 159, 178, 204, 242, 255]
const greens = [29, 51, 67, 102, 128, 153, 174, 204, 245, 255]
const blues = [26, 40, 77, 98, 128, 153, 179, 201, 247, 255]
const alphas = [26, 51, 77, 102, 128, 153, 179, 204, 230, 255]*/

const reds = [23, 55, 70, 98, 128, 159, 174, 204, 242, 255]
const greens = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
const blues = [40, 70, 98, 128, 159, 174, 201, 222, 247, 255]

print("reds", reds.length)
print("greens", greens.length)
print("blues", blues.length)

const RECT_SIZE = 20

const tick = () => {
	if (!paused) {
		//drawer.next()
	}
}

const fullDraw = () => {
	const d = draw()
	context.clearRect(0, 0, canvas.width, canvas.height)
	while (d.next().value !== "finished") {
		
	}
}

const draw = function*() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	for (let r = 0; r < reds.length; r++) for (let g = 0; g < greens.length; g++) for (let b = 0; b < blues.length; b++) {
		const red = reds[r]
		const green = greens[g]
		const blue = blues[b]
		context.fillStyle = `rgb(${red}, ${green}, ${blue})`

		let d = RECT_SIZE
		let y = g * RECT_SIZE
		let x = b * RECT_SIZE + r * RECT_SIZE*blues.length
		while (x+RECT_SIZE > document.body.clientWidth) {
			y += RECT_SIZE*greens.length
			x -= document.body.clientWidth
			
		}

		/*let scale = 0.1
		let d = RECT_SIZE
		d += r**2 * RECT_SIZE * scale

		let x = g * d
		let y = b * d

		let movement = 0.7

		x += r * d * movement
		y += r * d * movement

		x -= (d ** 2)/(200  * scale)
		y -= (d ** 2)/(500  * scale)

		x += 1000
		y += 500*/


		context.fillRect(x, y, d, d)
		yield
	}

	return "finished"
}

const drawer = draw()