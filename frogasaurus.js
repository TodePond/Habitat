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
		entries.push({source, name, path: "./" + entryPath.slice("source/".length)})

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

const getImportNames = (line) => {
	const [head, tail] = line.split("{")
	const [inner] = tail.split("}")
	const names = inner.split(",").map(name => name.trim())
	return names
}

const getImportPath = (line) => {
	const [head, tail] = line.split(" from ")
	const [start, path, end] = tail.split(`"`)
	return path
}

const parseExport = (line, {fileName, lineNumber}) => {

	const trim = trimStart(line)
	const {trimmed, trimming} = trim
	const exportSnippet = trimmed.slice(0, "export ".length)
	if (exportSnippet !== "export ") return {success: false}
	
	const trimLength = line.length - trimmed.length
	const tail = line.slice("export ".length + trimLength)

	const constSnippet = tail.slice(0, "const ".length)
	if (constSnippet !== "const ") {
		console.log(`%cError: Sorry, Frogasaurus only supports exports when you write 'const' immediately after.\n%c${fileName}:${lineNumber}\n\n	${line}\n`, RED, "")
		return {success: false}
	}

	const name = getConstName(tail)
	return {
		success: true,
		name,
		margin: trimming,
		tail,
	}
}

const parseImport = (line, {fileName, lineNumber}) => {
	const trim = trimStart(line)
	const {trimmed, trimming} = trim
	const importSnippet = trimmed.slice(0, "import ".length)
	if (importSnippet !== "import ") return {success: false}
	
	const trimLength = line.length - trimmed.length
	const tail = line.slice("import ".length + trimLength)

	const path = getImportPath(tail)
	const names = getImportNames(tail)
	const output = `{ ${names.join(", ")} }`

	return {
		success: true,
		names,
		path,
		output,
		margin: trimming,
		tail,
	}
}

//======//
// EMIT //
//======//
const HEADER_LINES = [
	`//=============//`,
	`// FROGASAURUS //`,
	`//=============//`,
	`const Frogasaurus = {}`,
	``,
	`//========//`,
	`// SOURCE //`,
	`//========//`,
	``,
]

const FOOTER_TITLE_LINES = [
	``,
	``,
	`//=========//`,
	`// EXPORTS //`,
	`//=========//`,
	``,
]

const HEADER = HEADER_LINES.join("\n")
const FOOTER_TITLE = FOOTER_TITLE_LINES.join("\n")

const transpileSource = (source, name, path) => {

	const lines = source.split("\n")

	const strippedLines = []
	const exportResults = []
	const importResults = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		const metadata = {fileName: name, lineNumber: i}
		const exportResult = parseExport(line, metadata)
		if (exportResult.success) {
			strippedLines.push(`\t${exportResult.margin}${exportResult.tail}`)
			exportResults.push(exportResult)
			continue
		}
		
		const importResult = parseImport(line, metadata)
		if (importResult.success) {
			importResults.push(importResult)
			continue
		}

		strippedLines.push(`\t${line}`)
	}

	const exportLines = []
	for (const exportResult of exportResults) {
		exportLines.push(`\t\tFrogasaurus["${path}"].${exportResult.name} = ${exportResult.name}`)
	}
	const exportSource = exportLines.join("\n")
	const innerSource = `\t\tFrogasaurus["${path}"] = {}\n\t${strippedLines.join("\n\t")}\n\n${exportSource}`
	const scopedSource = `\t//====== ${path} ======\n\t{\n${innerSource}\n\t}`

	return {success: true, output: scopedSource, exportResults, importResults, path}
}

const build = async (projectName) => {

	console.clear()

	const entries = await readDirectory("source")
	const sourceResults = entries.map(entry => transpileSource(entry.source, entry.name, entry.path))
	if (sourceResults.some(result => !result.success)) {
		console.log("%cFailed build", RED)
		return
	}

	const exportNames = new Set()
	for (const result of sourceResults) {
		for (const exportResult of result.exportResults) {
			if (exportNames.has(exportResult.name)) {
				console.log("%cSorry, you can't have multiple exports with the same name", RED)
				console.log("%cThis is because Frogasaurus mashes all your exports together <3", RED)
				console.log(`${result.path}`)
				console.log(`\n\t${exportResult.name}\n`)
				console.log("%cFailed build", RED)
				return
			}
			exportNames.add(exportResult.name)
		}
	}

	const exportFooterLines = sourceResults.map(result => `export const { ${result.exportResults.map(exportResult => exportResult.name).join(", ")} } = Frogasaurus["${result.path}"]`)
	const exportFooterSource = exportFooterLines.join("\n")

	const globalFooterLines = [
		`const ${projectName} = {`,
	]

	for (const sourceResult of sourceResults) {
		for (const exportResult of sourceResult.exportResults) {
			globalFooterLines.push(`\t${exportResult.name}: Frogasaurus["${sourceResult.path}"].${exportResult.name},`)
		}
	}

	globalFooterLines.push(`}`)
	const globalFooterSource = globalFooterLines.join("\n")

	const importLists = new Map()
	for (const sourceResult of sourceResults) {

		for (const importResult of sourceResult.importResults) {
			if (importLists.get(importResult.path) === undefined) {
				importLists.set(importResult.path, new Set())
			}

			const importList = importLists.get(importResult.path)
			for (const name of importResult.names) {
				importList.add(name)
			}
		}
	}

	const importFooterLines = []
	for (const [path, importList] of importLists.entries()) {
		importFooterLines.push(`\tconst { ${[...importList.values()].join(", ")} } = Frogasaurus["${path}"]`)
	}
	const importFooterSource = "\n\n" + importFooterLines.join("\n")

	const transpiledSource = "{\n" + sourceResults.map(result => result.output).join("\n\n") + importFooterSource + "\n}"

	const importSource = HEADER + transpiledSource + FOOTER_TITLE + exportFooterSource + "\n\nexport " + globalFooterSource
	const embedSource = HEADER + transpiledSource + FOOTER_TITLE + globalFooterSource
		
	await writeFile(`${projectName.toLowerCase()}-import.js`, importSource)
	await writeFile(`${projectName.toLowerCase()}-embed.js`, embedSource)

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

await build(projectName)

const watcher = Deno.watchFs("./source")
for await (const event of watcher) {
	await build(projectName)
}
