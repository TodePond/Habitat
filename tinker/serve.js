import { serve } from "https://deno.land/std/http/server.ts"
import { serveFile } from "https://deno.land/std/http/file_server.ts"
import { resolve } from "https://deno.land/std/path/mod.ts"
const s = serve({port: 8000 })
console.log("%cServer Running on port 8000", "color: rgb(0, 128, 255)")
for await (const req of s) {
	const isDir = req.url.split(".").length === 1
	if (isDir) {
		if (req.url.slice(-1) === "/") req.url += "index.html"
		else req.url += "/index.html"
	}
	const url = resolve("." + req.url)
	try {
		const content = await serveFile(req, url)
		req.respond(content)
		if (url.slice(-".html".length) === ".html") console.log(`%cServing ${url}`, "color: rgb(0, 255, 128)")
	}
	catch {
		req.respond({status: 404})
	}
}