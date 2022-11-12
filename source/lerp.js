import { add, scale, subtract } from "./vector.js"

export const lerp = ([a, b], distance) => {
	const range = subtract(b, a)
	const displacement = scale(range, distance)
	return add(a, displacement)
}

export const bilerp = ([a, b, c, d], displacement) => {
	const [dx, dy] = displacement
	const la = lerp([a, b], dx)
	const lb = lerp([d, c], dx)

	const line = [la, lb]
	return lerp(line, dy)
}

// based on https://iquilezles.org/articles/ibilinear
// adapted by Magnogen https://magnogen.net
export const ibilerp = (point, quadrilateral) => {

	const p = point
	const [a, b, c, d] = quadrilateral

	const e = subtractVector(b, a)
	const f = subtractVector(d, a)
	const g = addVector(subtractVector(a, b), subtractVector(c, d))
	const h = subtractVector(p, a)

	const [ex] = e
	const [fx] = f
	const [gx] = g
	const [hx] = h

	const k2 = crossProductVector(g, f)
	const k1 = crossProductVector(e, f) + crossProductVector(h, g)
	const k0 = crossProductVector(h, e)
	
	if (Math.abs(k2) < 0.0001) {
		const x = (hx*k1 + fx*k0) / (ex*k1 - gx*k0)
		const y = -k0/k1
		return [x, y]
	}

	let w = k1*k1 - 4*k0*k2
	w = Math.sqrt(w)

	const ik2 = 0.5/k2
	let v = (-k1 - w)*ik2
	let u = (hx - fx*v) / (ex + gx*v)

	if (u < 0.0 || u > 1.0 || v < 0.0 || v > 1.0) {
		v = (-k1 + w)*ik2
		u = (hx - fx*v) / (ex + gx*v)
	}

	return [u, v]
}