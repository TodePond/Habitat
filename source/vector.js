import { defineAccessor } from "./property.js"

export const scale = (value, scale) => {
	if (typeof value === "number") return value * scale
	return value.map((v) => v * scale)
}

export const multiply = (a, b) => {
	if (typeof b === "number") return scale(a, b)
	if (typeof a === "number") return scale(b, a)
	throw new Error("Unimplemented because I can't decide what to do with vectors")
}

export const add = (a, b) => {
	if (typeof a === "number") {
		return a + b
	}

	if (a.length === 2) {
		const [ax, ay] = a
		const [bx, by] = b
		const x = ax + bx
		const y = ay + by
		return [x, y]
	} else {
		const [ax, ay, az] = a
		const [bx, by, bz] = b
		const x = ax + bx
		const y = ay + by
		const z = az + bz
		return [x, y, z]
	}
}

export const subtract = (a, b) => {
	if (typeof a === "number") {
		return a - b
	}

	if (a.length === 2) {
		const [ax, ay] = a
		const [bx, by] = b
		const x = ax - bx
		const y = ay - by
		return [x, y]
	} else {
		const [ax, ay, az] = a
		const [bx, by, bz] = b
		const x = ax - bx
		const y = ay - by
		const z = az - bz
		return [x, y, z]
	}
}

export const crossProduct = (a, b) => {
	if (a.length === 2) {
		const [ax, ay] = a
		const [bx, by] = b
		return ax * by - ay * bx
	} else {
		const [ax, ay, az] = a
		const [bx, by, bz] = b
		return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]
	}
}

export const distanceBetween = (a, b) => {
	if (typeof a === "number") {
		return Math.abs(a - b)
	}

	const displacement = subtract(a, b)
	const [dx, dy, dz = 0] = displacement
	const distance = Math.hypot(dx, dy, dz)
	return distance
}

export const angleBetween = (a, b) => {
	if (a.length !== 2) {
		throw new Error(
			"[Habitat] Sorry, only 2D vectors are supported at the moment. Please bug @todepond to support other lengths :)",
		)
	}
	const displacement = subtract(a, b)
	const [dx, dy] = displacement
	const angle = Math.atan2(dy, dx)
	return angle
}

export const rotate = (vector, angle, origin = [0, 0]) => {
	const displacement = subtract(vector, origin)
	const [dx, dy] = displacement
	const cos = Math.cos(angle)
	const sin = Math.sin(angle)
	const x = dx * cos - dy * sin
	const y = dx * sin + dy * cos
	const rotated = add([x, y], origin)
	return rotated
}

export const registerVectorMethods = () => {
	defineAccessor(
		Array.prototype,
		"x",
		function () {
			return this[0]
		},
		function (value) {
			this[0] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"y",
		function () {
			return this[1]
		},
		function (value) {
			this[1] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"z",
		function () {
			return this[2]
		},
		function (value) {
			this[2] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"width",
		function () {
			return this[0]
		},
		function (value) {
			this[0] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"height",
		function () {
			return this[1]
		},
		function (value) {
			this[1] = value
		},
	)

	defineAccessor(
		Array.prototype,
		"depth",
		function () {
			return this[2]
		},
		function (value) {
			this[2] = value
		},
	)
}
