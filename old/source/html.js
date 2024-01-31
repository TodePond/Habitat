export const HTML = (source) => {
	const template = document.createElement("template")
	template.innerHTML = source
	const { content } = template
	if (content.childElementCount === 1) {
		return content.firstChild
	}
	return template.content
}
