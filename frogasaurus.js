//========//
// COLOUR //
//========//
const BLUE = "color: rgb(0, 128, 255)"
const RED = "color: rgb(255, 70, 70)"
const GREEN = "color: rgb(0, 255, 128)"
const YELLOW = "color: #ffcc46"

//======//
// FILE //
//======//
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
		entries.push({source, name, path: entryPath})

	}

	return entries
}

//========//
// STRING //
//========//
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

//=======//
// PARSE //
//=======//
const getConstName = (line) => {
	for (let i = "const ".length; i < line.length; i++) {
		const char = line[i]
		if (char === " " || char === "	" || char === "=") {
			return line.slice("const ".length, i)
		}
	}
}

const getObjectConstName = (line) => {
	for (let i = "{ ".length; i < line.length; i++) {
		const char = line[i]
		if (char === " " || char === "	" || char === "}") {
			return line.slice("{ ".length, i)
		}
	}
}

const parseExport = (line, fileName, lineNumber) => {
	const trim = trimStart(line)
	const {trimmed, trimming} = trim
	const exportSnippet = trimmed.slice(0, "export ".length)
	if (exportSnippet !== "export ") return {success: false}
	
	const trimLength = line.length - trimmed.length
	const tail = line.slice("export ".length + trimLength)

	const constSnippet = tail.slice(0, "const ".length)
	if (constSnippet !== "const ") {
		console.log(`%cError: Sorry, Frogasaurus only supports exports when you write 'const' immediately after.\n%c${fileName}:${lineNumber}\n\n	${line}\n`, RED, "")
		return
	}

	const name = getConstName(tail)
	return {
		success: true,
		name,
		margin: trimming,
		tail
	}
}

const parseImport = (line, fileName, lineNumber) => {
	const trim = trimStart(line)
	const {trimmed, trimming} = trim
	const importSnippet = trimmed.slice(0, "import ".length)
	if (importSnippet !== "import ") return {success: false}
	
	const trimLength = line.length - trimmed.length
	const tail = line.slice("import ".length + trimLength)
	const name = getObjectConstName(tail)

	return {
		success: true,
		name,
		margin: trimming,
		tail
	}
}

//======//
// EMIT //
//======//
const sanitiseSource = (source, name, path) => {

	const lines = source.split("\n")

	const strippedLines = []
	const exports = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		const exportResult = parseExport(line, {fileName: name, lineNumber: i})
		if (exportResult.success) {
			strippedLines.push(`\t${exportResult.margin}${exportResult.tail}`)
			exports.push(exportResult.name)
			continue
		}
		
		const importResult = parseImport(line, {fileName: name,	lineNumber: i})
		if (importResult.success) {
			strippedLines.push(`\tconst ${importResult.name} = Frogasaurus.import("${importResult.name}")`)
			continue
		}

		strippedLines.push(`\t${line}`)
	}

	const exportLines = exports.map(name => `\tFrogasaurus.export(${name}, "${name}")`)
	const innerSource = `${strippedLines.join("\n")}\n\n${exportLines.join("\n")}`
	const scopedSource = `Frogasaurus.files["${path}"] = async () => {\n${innerSource}\n}`
	return scopedSource
}

const buildSource = async (projectName) => {
	
	console.clear()
		
	const entries = await readDirectory("source")
	const sources = entries.map(entry => entry.source)

	const sanitisedSources = entries.map(entry => sanitiseSource(entry.source, entry.name, entry.path))
	if (sanitisedSources.includes(undefined)) {
		console.log("%cFailed build!", RED)
		return
	}
	
	const importSource = sources.join("\n")
	const embedSource = sanitisedSources.join("\n\n")
	
	await writeFile(`${projectName}-import.js`, importSource)
	await writeFile(`${projectName}-embed.js`, embedSource)

	console.log("%cFinished build!", YELLOW)
	console.log("Waiting for file changes...")
}

//======//
// MAIN //
//======//
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
