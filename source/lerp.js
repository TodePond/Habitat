import { addVector, scaleVector, subtractVector } from "./vector.js"

export const lerp = (distance, [start, end]) => {
	if (Array.isArray(start)) {
		return lerpVector(distance, [start, end])
	}
	const range = end - start
	return start + range * distance
}

export const lerpVector = (distance, [start, end]) => {
	const range = subtractVector(end, start)
	const displacement = scaleVector(range, distance)
	return addVector(start, displacement)
}

export const bilerp = (displacement, quadrilateral) => {
	const [dx, dy] = displacement
	const [a, b, c, d] = quadrilateral

	const la = lerp(dx, [a, b])
	const lb = lerp(dx, [d, c])
	const line = [la, lb]

	const point = lerp(dy, line)
	return point
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