export const SVG = (source) => {
	const group = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	group.innerHTML = source
	if (group.childElementCount === 1) {
		return group.firstChild
	}
	return group
}
