//=======//
// SETUP //
//=======//
const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")
canvas.style["background-color"] = Colour.Black
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
	draw()
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

//              0   1   2    3   4    5    6    7    8    9
const reds   = [23, 55, 70,  98, 128, 159, 174, 204, 242, 255]
const greens = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
const blues  = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]


const Black = 0
const Grey = 112
const Silver = 556
const White = 888
const Green = 293
const Red = 911
const Blue = 239
const Yellow = 961
const Orange = 931
const Pink = 933
const Rose = 936
const Cyan = 269
const Purple = 418

/*
print("reds", reds.length)
print("greens", greens.length)
print("blues", blues.length)
*/

const RECT_SIZE = 20

const tick = () => {
	if (!paused) {
		//drawer.next()
	}
}

const draw = () => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	
	let x = 0
	let y = 0

	for (const key in Colour) {
		if (!key[0].is(UpperCase)) continue
		const colour = Colour[key]
		context.fillStyle = colour
		context.fillRect(x, y, RECT_SIZE, RECT_SIZE)
		x += RECT_SIZE
		if (x > canvas.width) {
			x = 0
			y += RECT_SIZE
		}
	}

	/*for (let r = 0; r < reds.length; r++) for (let g = 0; g < greens.length; g++) for (let b = 0; b < blues.length; b++) {
		const red = reds[r]
		const green = greens[g]
		const blue = blues[b]
		
		context.fillStyle = `rgb(${red}, ${green}, ${blue})`
		context.fillRect(x, y, RECT_SIZE, RECT_SIZE)

		x += RECT_SIZE
		if (x > canvas.width) {
			x = 0
			y += RECT_SIZE
		}
	}*/
}

const drawer = draw()