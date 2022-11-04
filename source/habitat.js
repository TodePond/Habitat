import { registerColourMethods } from "./colour.js"
import { registerDebugMethods } from "./console.js"

export const registerMethods = () => {
	registerDebugMethods()
	registerColourMethods()
}

export const registerGlobals = () => {
	Object.assign(window, Habitat)
}

export const registerEverything = () => {
	registerGlobals()
	registerMethods()
}