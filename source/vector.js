import { defineGetter } from "./property.js"

export const scaleVector = (vector, scale) => {
	return vector.map(v => v * scale)
}

export const addVector = (a, b) => {
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

export const subtractVector = (a, b) => {
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

export const crossProductVector = (a, b) => {
	if (a.length === 2) {
		const [ax, ay] = a
		const [bx, by] = b
		return ax*by - ay*bx
	} else {
		const [ax, ay, az] = a
		const [bx, by, bz] = b
		return [ay*bz - az*by, az*bx - ax*bz, ax*by - ay*bx]
	}
}

export const distanceBetweenVectors = (a, b) => {
	const displacement = subtractVector(a, b)
	const [dx, dy, dz = 0] = displacement
	const distance = Math.hypot(dx, dy, dz)
	return distance
}

export const angleBetweenVectors = (a, b) => {
	if (a.length !== 2) {
		throw new Error('[Habitat] Sorry, only 2D vectors are supported at the moment. Please bug @todepond to support other lengths :)')
	}
	const displacement = subtractVector(a, b)
	const [dx, dy] = displacement
	const angle = Math.atan2(dy, dx)
	return angle
}

export const registerVectorMethods = () => {
	defineGetter(Array.prototype, 'x', function() {
		return this[0]
	})

	defineGetter(Array.prototype, 'y', function() {
		return this[1]
	})

	defineGetter(Array.prototype, 'z', function() {
		return this[2]
	})
}