const BLUE = "color: rgb(0, 128, 255)"
const RED = "color: rgb(255, 70, 70)"
const GREEN = "color: rgb(0, 255, 128)"
const YELLOW = "color: #ffcc46"

const readFile = async (path) => {
	console.log(`%cReading File: ${path}`, BLUE)
	const source = await Deno.readTextFile(path)
	return source
}

const writeFile = async (path, source) => {
	console.log(`%cWriting File: ${path}`, GREEN)
	return await Deno.writeTextFile(path, source)
}

const readDirectory = async (path) => {
	
	const entries = []

	for await (const entry of Deno.readDir(path)) {

		const {name} = entry
		const entryPath = `${path}/${name}`

		// Go deeper if it's a directory
		if (entry.isDirectory) {
			entries.push(...await readDirectory(entryPath))
			continue
		}

		// Make sure it's a javascript file
		const [head, extension] = name.split(".")
		if (extension !== "js") continue

		const source = await readFile(entryPath)
		entries.push({source, name})

	}

	return entries
}

const trimStart = (string) => {
	for (let i = 0; i < string.length; i++) {
		const char = string[i]
		if (char === " " || char === "	") continue
		const trimmed = string.slice(i)
		const trimming = string.slice(0, i)
		return {trimmed, trimming}
	}
	return {trimmed: "", trimming: ""}
}

const getConstName = (line) => {
	for (let i = "const ".length; i < line.length; i++) {
		const char = line[i]
		if (char === " " || char === "	" || char === "=") {
			return line.slice("const ".length, i)
		}
	}
}

const sanitiseSource = (source, name) => {
	const lines = source.split("\n")
	const trims = lines.map(line => trimStart(line))
	const strippedLines = []
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const trim = trims[i]
		const {trimmed, trimming} = trim
		const exportSnippet = trimmed.slice(0, "export ".length)
		const importSnippet = trimmed.slice(0, "import ".length)
		
		if (exportSnippet === "export ") {
			const trimLength = line.length - trimmed.length
			const strippedLine = line.slice("export ".length + trimLength)
			const constSnippet = strippedLine.slice(0, "const ".length)
			if (constSnippet !== "const ") {
				console.log(`%cError: Sorry, Frogasaurus only supports exports when you write 'const' immediately after.\n%c${name}:${i}\n\n	${line}\n`, RED, "")
				return
			}
			strippedLines.push(`\t${trimming}${strippedLine}`)
			continue
		}

		strippedLines.push(`\t${line}`)
	}

	const blocked = `{\n${strippedLines.join("\n")}\n}`
	return blocked
}

const buildSource = async (projectName) => {
	
	console.clear()
		
	const entries = await readDirectory("source")
	const sources = entries.map(entry => entry.source)

	const sanitisedSources = entries.map(entry => sanitiseSource(entry.source, entry.name))
	if (sanitisedSources.includes(undefined)) {
		console.log("%cFailed build!", RED)
		return
	}
	
	const importSource = sources.join("\n")
	const embedSource = sanitisedSources.join("\n")
	
	await writeFile(`${projectName}-import.js`, importSource)
	await writeFile(`${projectName}-embed.js`, embedSource)

	console.log("%cFinished build!", YELLOW)
	console.log("Waiting for file changes...")
}

const directory = Deno.cwd()
const directoryParts = directory.split("\\")
const projectName = directoryParts[directoryParts.length-1]

await Deno.permissions.request({name: "read", path: "."})
await Deno.permissions.request({name: "write", path: "."})

await buildSource(projectName)

const watcher = Deno.watchFs("./source")
for await (const event of watcher) {
	await buildSource(projectName)
}
