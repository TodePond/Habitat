export const struct = (parameters) =>
	function (args) {
		return { ...parameters, ...args }
	}
