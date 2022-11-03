export const JavaScript = (source) => {
	const code = `return ${source}`
	const value = new Function(code)()
	return value
}