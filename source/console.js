import { registerGlobal } from "./global.js"

export const print = console.log.bind(console)
registerGlobal({print})