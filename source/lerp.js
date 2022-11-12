import { add, crossProduct, scale, subtract } from "./vector.js"

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
export const ibilerp = ([a, b, c, d], value) => {

	if (typeof value === "number") {
		throw new Error(`[Habitat] Sorry, 'ibilerp' doesn't support numbers yet - only vectors... Please contact @todepond :)`)
	}

	const e = subtract(b, a)
	const f = subtract(d, a)
	const g = add(subtract(a, b), subtract(c, d))
	const h = subtract(value, a)

	const k2 = crossProduct(g, f)
	const k1 = crossProduct(e, f) + crossProduct(h, g)
	const k0 = crossProduct(h, e)
	
	if (Math.abs(k2) < 0.0001) {
		const x = (h[0]*k1 + f[0]*k0) / (e[0]*k1 - g[0]*k0)
		const y = -k0/k1
		return [x, y]
	}

	let w = k1*k1 - 4*k0*k2
	w = Math.sqrt(w)

	const ik2 = 0.5/k2
	let v = (-k1 - w)*ik2
	let u = (h[0] - f[0]*v) / (e[0] + g[0]*v)

	if (u < 0.0 || u > 1.0 || v < 0.0 || v > 1.0) {
		v = (-k1 + w)*ik2
		u = (h[0] - f[0]*v) / (e[0] + g[0]*v)
	}

	return [u, v]
}