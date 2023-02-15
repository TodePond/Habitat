export const divideString = (string, length) => {
	const regExp = RegExp(`[^]{1,${length}}`, "g")
	return string.match(regExp)
}
