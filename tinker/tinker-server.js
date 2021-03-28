import { serve } from "https://deno.land/std/http/server.ts"
import { serveFile } from "https://deno.land/std/http/file_server.ts"
import { resolve } from "https://deno.land/std/path/mod.ts"
const s = serve({port: 8000 })
console.log("Tinker Server Running")
for await (const req of s) {
	const url = resolve("." + req.url)
	const content = await serveFile(req, url)
	req.respond(content)
}