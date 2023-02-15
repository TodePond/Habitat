import { registerColourMethods } from "./colour.js"
import { registerDebugMethods } from "./console.js"
import { registerVectorMethods } from "./vector.js"

export const registerMethods = () => {
	registerDebugMethods()
	registerColourMethods()
	registerVectorMethods()
}

export const registerGlobals = () => {
	Object.assign(window, Habitat)
}

export const registerEverything = () => {
	registerGlobals()
	registerMethods()
}
