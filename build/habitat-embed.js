const Habitat = {}

//=======//
// Array //
//=======//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Array.prototype, "last", {
			get() {
				return this[this.length-1]
			},
			set(value) {
				Reflect.defineProperty(this, "last", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Array.prototype, "clone", {
			get() {
				return [...this]
			},
			set(value) {
				Reflect.defineProperty(this, "clone", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Array.prototype, "at", {
			value(position) {
				if (position >= 0) return this[position]
				return this[this.length + position]
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "shuffle", {
			value() {
				for (let i = this.length - 1; i > 0; i--) {
					const r = Math.floor(Math.random() * (i+1))
					;[this[i], this[r]] = [this[r], this[i]]
				}
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "trim", {
			value() {
				if (this.length == 0) return this
				let start = this.length - 1
				let end = 0
				for (let i = 0; i < this.length; i++) {
					const value = this[i]
					if (value !== undefined) {
						start = i
						break
					}
				}
				for (let i = this.length - 1; i >= 0; i--) {
					const value = this[i]
					if (value !== undefined) {
						end = i + 1
						break
					}
				}
				this.splice(end)
				this.splice(0, start)
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Array.prototype, "repeat", {
			value(n) {
				if (n === 0) {
					this.splice(0)
					return this
				}
				if (n < 0) {
					this.reverse()
					n = n - n - n 
				}
				const clone = [...this]
				for (let i = 1; i < n; i++) {
					this.push(...clone)
				}
				return this
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Array.installed = true
		
	}
	
	Habitat.Array = {install}
	
}

//=======//
// Async //
//=======//
{
	const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))
	const install = (global) => {
		global.sleep = sleep
		Habitat.Async.installed = true
	}
	
	Habitat.Async = {install, sleep}
}

//=========//
// Console //
//=========//
{
	const print = console.log.bind(console)
	const dir = (value) => console.dir(Object(value))
	
	let print9Counter = 0
	const print9 = (message) => {
		if (print9Counter >= 9) return
		print9Counter++
		console.log(message)
	}
	
	const install = (global) => {
		global.print = print
		global.dir = dir
		global.print9 = print9
		
		Reflect.defineProperty(global.Object.prototype, "d", {
			get() {
				const value = this.valueOf()
				console.log(value)
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.Object.prototype, "dir", {
			get() {
				console.dir(this)
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "dir", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		let d9Counter = 0
		Reflect.defineProperty(global.Object.prototype, "d9", {
			get() {
				const value = this.valueOf()
				if (d9Counter < 9) {
					console.log(value)
					d9Counter++
				}
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d9", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Habitat.Console.installed = true
		
	}
	
	Habitat.Console = {install, print, dir, print9}
}

//==========//
// Document //
//==========//
{

	const $ = (...args) => document.querySelector(...args)
	const $$ = (...args) => document.querySelectorAll(...args)

	const install = (global) => {
	
	
		global.$ = $
		global.$$ = $$
		
		if (global.Node === undefined) return
		
		Reflect.defineProperty(global.Node.prototype, "$", {
			value(...args) {
				return this.querySelector(...args)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Node.prototype, "$$", {
			value(...args) {
				return this.querySelectorAll(...args)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Document.installed = true
		
	}
	
	Habitat.Document = {install, $, $$}
	
}


//=======//
// Event //
//=======//
{

	const install = (global) => {
	
		Reflect.defineProperty(global.EventTarget.prototype, "on", {
			get() {
				return new Proxy(this, {
					get: (element, eventName) => (...args) => element.addEventListener(eventName, ...args),
				})
			},
			set(value) {
				Reflect.defineProperty(this, "on", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		Reflect.defineProperty(global.EventTarget.prototype, "trigger", {
			value(name, options = {}) {
				const {bubbles = true, cancelable = true, ...data} = options
				const event = new Event(name, {bubbles, cancelable})
				for (const key in data) event[key] = data[key]
				this.dispatchEvent(event)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Event.installed = true
		
	}
	
	Habitat.Event = {install}
	
}


//======//
// HTML //
//======//
{

	Habitat.HTML = (...args) => {
		const source = String.raw(...args)
		const template = document.createElement("template")
		template.innerHTML = source
		return template.content
	}

	Habitat.HTML.install = (global) => {
		global.HTML = Habitat.HTML
		Habitat.HTML.installed = true
	}
	
}


//============//
// JavaScript //
//============//
{
	
	Habitat.JavaScript = (...args) => {
		const source = String.raw(...args)
		const code = `return ${source}`
		const func = new Function(code)()
		return func
	}
	
	Habitat.JavaScript.install = (global) => {
		global.JavaScript = Habitat.JavaScript	
		Habitat.JavaScript.installed = true
	}
	
}


//==========//
// Keyboard //
//==========//
{

	const Keyboard = Habitat.Keyboard = {}
	Reflect.defineProperty(Keyboard, "install", {
		value(global) {
			global.Keyboard = Keyboard
			global.addEventListener("keydown", e => {
				Keyboard[e.key] = true
			})
			
			global.addEventListener("keyup", e => {
				Keyboard[e.key] = false
			})
			
			Reflect.defineProperty(Keyboard, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
}


//======//
// Main //
//======//
Habitat.install = (global) => {

	if (Habitat.installed) return

	if (!Habitat.Array.installed)      Habitat.Array.install(global)
	if (!Habitat.Async.installed)      Habitat.Async.install(global)
	if (!Habitat.Console.installed)    Habitat.Console.install(global)
	if (!Habitat.Document.installed)   Habitat.Document.install(global)
	if (!Habitat.Event.installed)      Habitat.Event.install(global)
	if (!Habitat.HTML.installed)       Habitat.HTML.install(global)
	if (!Habitat.JavaScript.installed) Habitat.JavaScript.install(global)
	if (!Habitat.Keyboard.installed)   Habitat.Keyboard.install(global)
	if (!Habitat.Math.installed)       Habitat.Math.install(global)
	if (!Habitat.MotherTode.installed) Habitat.MotherTode.install(global)
	if (!Habitat.Mouse.installed)      Habitat.Mouse.install(global)
	if (!Habitat.Number.installed)     Habitat.Number.install(global)
	if (!Habitat.Object.installed)     Habitat.Object.install(global)
	if (!Habitat.Property.installed)   Habitat.Property.install(global)
	if (!Habitat.Random.installed)     Habitat.Random.install(global)
	if (!Habitat.Stage.installed)      Habitat.Stage.install(global)
	if (!Habitat.Term.installed)       Habitat.Term.install(global)
	if (!Habitat.Touch.installed)      Habitat.Touch.install(global)
	if (!Habitat.Type.installed)       Habitat.Type.install(global)
	
	Habitat.installed = true
	
}

//======//
// Math //
//======//
{
	
	const gcd = (...numbers) => {
		const [head, ...tail] = numbers
		if (numbers.length === 1) return head
		if (numbers.length  >  2) return gcd(head, gcd(...tail))
		
		let [a, b] = [head, ...tail]
		
		while (true) {
			if (b === 0) return a
			a = a % b
			if (a === 0) return b
			b = b % a
		}
		
	}
	
	const reduce = (...numbers) => {
		const divisor = gcd(...numbers)
		return numbers.map(n => n / divisor)
	}
	
	const install = (global) => {
		global.Math.gcd = Habitat.Math.gcd
		global.Math.reduce = Habitat.Math.reduce
		Habitat.Math.installed = true
	}
	
	
	Habitat.Math = {install, gcd, reduce}
	
}


//============//
// MotherTode //
//============//
{

	Habitat.MotherTode = (...args) => {
		return Habitat.MotherTode.read(true, args)
	}
	
	Habitat.MotherTode.translate = (...args) => {
		return Habitat.MotherTode.read(false, args)
	}
	
	Habitat.MotherTode.read = (make = true, args) => {
		Term.resetCache()
		const source = String.raw(...args)
		//const source = dirtySource.split("").map(c => `\\${c}`).join("")
		//print(source)
		const result = Term.term("MotherTode", Habitat.MotherTode.scope)(source, {exceptions: [], indentSize: 0, scopePath: ""})
		if (!result.success) {
			result.log(8)
			return result
		}
		
		const output = `
			const global = window
			const scope = {}
			const term = ${result.output}
			for (const key in term) {
				scope[key] = term[key]
			}
			return term
		`
		const fullOutput = `(() => {\n${output}\n})()`
		if (!make) return fullOutput
		const func = new Function(output)
		
		
		const term = func()
		term.success = result.success
		term.output = result.output
		term.translation = fullOutput
		term.source = result.source
		term.tail = result.tail
		term.input = result.input
		term.args = result.args
		term.error = result.error
		term.log = (...args) => {
			//console.log(result.output)
			result.log(...args)
			return term
		}
		
		for (let i = 0; i < result.length; i++) {
			term[i] = result[i]
		}
		
		return term
	}
	
	Habitat.MotherTode.scope = {}
	
	Habitat.MotherTode.install = (global) => {
		//if (!Habitat.Term.installed) throw new Error('[MotherTode] MotherTode requires the Habitat.Term library')
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
		Habitat.MotherTode.global = global
		
		const scope = Habitat.MotherTode.scope
		const Term = Habitat.Term
		
		scope.MotherTode = Term.error(
			Term.emit(
				Term.list([
					Term.term("GroupInner", scope),
					Term.eof,
				]),
				([{output}]) => output,
			),
			({error}) => error,
		)
		
		scope.Term = Term.or([
			Term.term("Except", scope),
			Term.term("Or", scope),
			Term.term("Maybe", scope),
			Term.term("Many", scope),
			Term.term("Any", scope),
			
			Term.term("HorizontalDefinition", scope),
			Term.term("HorizontalList", scope),
			
			Term.term("GapReference", scope),
			Term.term("EOFReference", scope),
			Term.term("Reference", scope),
			
			Term.term("Group", scope),
			Term.term("MaybeGroup", scope),
			Term.term("AnyGroup", scope),
			Term.term("OrGroup", scope),
			Term.term("String", scope),
			Term.term("RegExp", scope),
			//Term.term("NoExceptions", scope),
		])
		
		scope.GapReference = Term.emit(
			Term.string("_"),
			"Term.many(Term.regExp(/ |	/))",
		)
		
		scope.EOFReference = Term.emit(
			Term.string("EOF"),
			"Term.eof",
		)
		
		scope.Reference = Term.emit(
			Term.list([
				Term.term("Name", scope),
				Term.maybe(
					Term.many(
						Term.list([
							Term.string("."),
							Term.term("Name", scope),
						])
					)
				),
			]),
			(name) => `Term.term('${name.args.scopePath}${name}', scope)`,
		)
		
		const makeDefinition = (options = {}) => {
			const {
				match = `Term.string('')`,
				emit,
				check,
				error,
				chain,
				args,
				subTerm,
				exp,
			} = options
			
			let definition = match
			if (check !== undefined) {
				definition = `Term.check(${definition}, ${check})`
			}
			if (error !== undefined) {
				definition = `Term.error(${definition}, ${error})`
			}
			if (chain !== undefined) {
				definition = `Term.chain(${chain}, ${definition})`
			}
			if (args !== undefined) {
				definition = `Term.args(${definition}, ${args})`
			}
			if (emit !== undefined) {
				definition = `Term.emit(${definition}, ${emit})`
			}
			if (subTerm !== undefined) {
				const subTermsCode = subTerm.map(([name, value]) => `['${name}', ${value}]`).join(",\n")
				definition = `Term.subTerms(${definition}, [\n${subTermsCode}\n])`
			}
			if (exp !== undefined) {
				const lines = []
				lines.push(`Term.export(${definition}, global, "${exp[0]}")`)
				/*lines.push(`(() => {`)
				lines.push(`	global.${exp[0]} = ${exp[1]}`)
				lines.push(`	return ${definition}`)
				lines.push(`})()`)*/
				definition = lines.join("\n")
			}
			return definition
		}
		
		const PROPERTY_NAMES = [
			"match",
			"emit",
			"check",
			"error",
			"chain",
			"args",
			"subTerm",
			"exp",
		]
		
		scope.HorizontalDefinition = Term.emit(
			Term.list([
				Term.term("DefinitionProperty", scope),
				Term.maybe(
					Term.many(
						Term.list([
							Term.term("Gap", scope),
							Term.term("DefinitionProperty", scope),
						])
					)
				),
			]),
			(result) => {
				const entries = new Function(`return [${result}]`)()
				const options = {}
				for (const property of entries) {
					for (const propertyName of PROPERTY_NAMES) {
						const propertyValue = property[propertyName]
						if (propertyValue !== undefined) {
							if (propertyName == "subTerm") {
								if (options.subTerm === undefined) options.subTerm = []
								options.subTerm.push(propertyValue)
								continue
							}
							if (options[propertyName] !== undefined) {
								result.success = false
								return
							}
							options[propertyName] = propertyValue
						}
					}
				}
				
				const definition = makeDefinition(options)
				return definition
				
			}
		)
		
		scope.DefinitionEntry = Term.or([
			Term.term("Export", scope),
			Term.term("DefinitionProperty", scope),
			Term.term("Declaration", scope),
		])
		
		scope.Name = Term.many(Term.regExp(/[a-zA-Z_$]/))
		
		scope.Declaration = Term.emit(
			Term.args(
				Term.list([
					Term.term("Name", scope),
					Term.maybe(Term.term("Gap", scope)),
					Term.term("Term", scope),
				]),
				(args, input) => {
					const nameResult = scope.Name(input)
					if (!nameResult.success) return args
					const name = nameResult.output
					args.scopePath += name + "."
					//args.d
					return args
				}
			),
			([name, gap, term]) => {
				return `{subTerm: [\`${name}\`, \`${sanitise(term.output)}\`]},`
			}
		)
		
		scope.Export = Term.emit(
			Term.list([
				Term.string("export"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Reference", scope),
			]),
			([exp, gap, term]) => {
				const name = term.output.split("'")[1]
				return `{exp: ["${name}", "${term}"]},`
			}
		)
		
		scope.VerticalDefinition = Term.emit(
			Term.list([
				Term.term("DefinitionEntry", scope),
				Term.maybe(
					Term.many(
						Term.list([
							Term.term("NewLine", scope),
							Term.term("DefinitionEntry", scope),
						])
					)
				),
			]),
			(result) => {
				const entries = new Function(`return [${result}]`)()
				const options = {}
				for (const property of entries) {
					for (const propertyName of PROPERTY_NAMES) {
						const propertyValue = property[propertyName]
						if (propertyValue !== undefined) {
							if (propertyName == "subTerm") {
								if (options.subTerm === undefined) options.subTerm = []
								options.subTerm.push(propertyValue)
								continue
							}
							if (options[propertyName] !== undefined) {
								result.success = false
								return
							}
							options[propertyName] = propertyValue
						}
					}
				}
				
				const definition = makeDefinition(options)
				return definition
			},
		)
		
		scope.DefinitionProperty = Term.or([
			Term.term("MatchProperty", scope),
			Term.term("EmitProperty", scope),
			Term.term("CheckProperty", scope),
			Term.term("ErrorProperty", scope),
			Term.term("ArgsProperty", scope),
			Term.term("ChainProperty", scope),
		])
		
		const sanitise = (string) => string.split("`").join("\\`")
		
		scope.MatchProperty = Term.emit(
			Term.list([
				Term.string("::"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Term", scope),
			]),
			([operator, gap, term = {}]) => `{match: \`${sanitise(term.output)}\`}, `,
		)
		
		scope.ChainProperty = Term.emit(
			Term.list([
				Term.string("++"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Term", scope),
			]),
			([operator, gap, term = {}]) => `{chain: \`${sanitise(term.output)}\`}, `,
		)
		
		scope.EmitProperty = Term.emit(
			Term.list([
				Term.string(">>"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{emit: \`${sanitise(term.output)}\`},`,
		)
		
		scope.CheckProperty = Term.emit(
			Term.list([
				Term.string("??"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{check: \`${sanitise(term.output)}\`},`,
		)
		
		scope.ErrorProperty = Term.emit(
			Term.list([
				Term.string("!!"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{error: \`${sanitise(term.output)}\`},`,
		)
		
		scope.ArgsProperty = Term.emit(
			Term.list([
				Term.string("@@"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{args: \`${sanitise(term.output)}\`},`,
		)
		
		scope.JavaScript = Term.emit(
			Term.or([
				Term.term("JavaScriptMultiple", scope),
				Term.term("JavaScriptSingle", scope),
			]),
			({output}) => {
				const state = {
					escape: false,
					output: "",
				}
				for (let i = 0; i < output.length; i++) {
					const c = output[i]
					if (state.escape) {
						state.output += c
						state.escape = false
					}
					else if (c === "'") state.output += "`"
					else if (c === "#") state.output += "\\$"
					else state.output += c
				}
				return state.output
			}
		)
		
		scope.JavaScriptSingle = Term.term("Line", scope)
		scope.JavaScriptMultiple = Term.list([
			Term.term("Line", scope),
			Term.args(
				Term.term("JavaScriptMultipleInner", scope),
				(args) => {
					args.indentSize++
					return args
				}
			),
			Term.term("Line", scope),
		])
		
		scope.JavaScriptMultipleInner = Term.list([
			Term.term("NewLine", scope),
			Term.term("JavaScriptLines", scope),
			Term.term("Unindent", scope),
		])
		
		scope.JavaScriptLines = Term.list([
			Term.term("Line", scope),
			Term.maybe(
				Term.many(
					Term.list([
						Term.term("NewLine", scope),
						Term.term("Line", scope),
					])
				)
			)
		])
		
		scope.Line = Term.list([
			Term.many(Term.regExp(/[^\n]/)),
		])
		
		scope.Many = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Many", scope)]),
				Term.maybe(Term.term("Gap", scope)),
				Term.check(
					Term.string("+"),
					(result) => result.tail[0] !== "+",
				),
			]),
			([term]) => `Term.many(${term})`,
		)
		
		scope.Except = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Except", scope)]),
				Term.maybe(Term.term("Gap", scope)),
				Term.string("~"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Term", scope),
			]),
			([left, gap1, operator, gap2, right]) => `Term.except(${left}, [${right}])`,
		)
		
		scope.NoExceptions = Term.emit(
			Term.list([
				Term.string("any"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Term", scope),
			]),
			([keyword, gap, term]) => `Term.any(${term})`,
		)
		
		scope.Or = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Or", scope)]),
				Term.term("OrTails", scope),
			]),
			([head, tail = []]) => `Term.or([${head}, ${tail}])`,
		)
		
		scope.OrTail = Term.emit(
			Term.list([
				Term.maybe(Term.term("Gap", scope)),
				Term.string("|"),
				Term.maybe(Term.term("Gap", scope)),
				Term.except(Term.term("Term", scope), [Term.term("Or", scope)]),
			]),
			([gap1, operator, gap2, term]) => `${term}`,
		)
		
		scope.OrTails = Term.emit(
			Term.many(Term.term("OrTail", scope)),
			(tails) => tails.filter(t => t.success).map(t => t.output).join(", "),
		)
		
		scope.Maybe = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Maybe", scope)]),
				Term.maybe(Term.term("Gap", scope)),
				Term.check(
					Term.string("?"),
					(result) => result.tail[0] !== "?" //
				),
			]),
			([term]) => `Term.maybe(${term})`,
		)
		
		scope.Any = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Any", scope)]),
				Term.maybe(Term.term("Gap", scope)),
				Term.string("*"),
			]),
			([term]) => `Term.maybe(Term.many(${term}))`,
		)
		
		scope.MaybeGroup = Term.emit(
			Term.list([
				Term.string("["),
				Term.term("GroupInner", scope),
				Term.string("]"),
			]),
			([left, inner]) => `Term.maybe(${inner})`,
		)
		
		scope.AnyGroup = Term.emit(
			Term.list([
				Term.string("{"),
				Term.term("GroupInner", scope),
				Term.string("}"),
			]),
			([left, inner]) => `Term.maybe(Term.many(${inner}))`,
		)
		
		scope.OrGroup = Term.emit(
			Term.list([
				Term.string("<"),
				Term.term("ArrayInner", scope),
				Term.string(">"),
			]),
			([left, inner]) => `Term.or([${inner}])`,
		)
		
		scope.Group = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("GroupInner", scope),
				Term.string(")"),
			]),
			([left, inner]) => `${inner}`,
		)
		
		scope.ArrayInner = Term.or([
			Term.term("HorizontalArrayInner", scope),
			Term.emit(
				Term.args(
					Term.term("VerticalArrayInner", scope),
					(args) => {
						args.indentSize++
						return args
					}
				),
				(array) => `\n${getMargin(array.args.indentSize)}${array}\n${getMargin(array.args.indentSize-1)}`
			)
		])
		
		scope.GroupInner = Term.or([
			Term.term("HorizontalGroupInner", scope),
			Term.args(
				Term.term("VerticalGroupInner", scope),
				(args) => {
					args.indentSize++
					return args
				}
			)
		])
		
		scope.HorizontalArrayInner = Term.emit(
			Term.list([
				Term.maybe(Term.term("Gap", scope)),
				Term.or([
					Term.except(Term.term("HorizontalArray", scope), [Term.term("HorizontalList", scope)]),
					Term.except(Term.term("Term", scope), []),
				]),
				Term.maybe(Term.term("Gap", scope)),
			]),
			([left, inner]) => `${inner}`,
		)
		
		scope.VerticalArrayInner = Term.emit(
			Term.list([
				Term.term("NewLine", scope),
				Term.or([
					Term.term("VerticalArray", scope),
					Term.term("Term", scope),
				]),
				Term.term("Unindent", scope),
			]),
			([left, inner]) => `${inner}`,
		)
		
		scope.HorizontalGroupInner = Term.emit(
			Term.list([
				Term.maybe(Term.term("Gap", scope)),
				Term.or([
					Term.term("HorizontalDefinition", scope),
					Term.term("Term", scope),
				]),
				Term.maybe(Term.term("Gap", scope)),
			]),
			([left, inner]) => `${inner}`,
		)
		
		scope.VerticalGroupInner = Term.emit(
			Term.list([
				Term.term("NewLine", scope),
				Term.or([
					Term.term("VerticalDefinition", scope),
					Term.term("VerticalList", scope),
					Term.term("Term", scope),
				]),
				Term.term("Unindent", scope),
			]),
			([left, inner]) => `${inner}`,
		)
		
		const getMargin = (size) => [`	`].repeat(size).join("")
		scope.Margin = Term.check(
			Term.maybe(Term.term("Gap", scope)),
			(gap) => {
				const indentSize = gap.args.indentSize === undefined? 0 : gap.args.indentSize
				return `${gap}`.length === indentSize
			},
		)
		
		scope.NewLine = Term.list([
			Term.many(
				Term.list([
					Term.maybe(Term.term("Gap", scope)),
					Term.string("\n"),
				])
			),
			Term.term("Margin", scope),
		])
		
		scope.Unindent = Term.list([
			Term.many(
				Term.list([
					Term.maybe(Term.term("Gap", scope)),
					Term.string("\n"),
				])
			),
			Term.args(
				Term.term("Margin", scope),
				(args) => {
					args.indentSize--
					return args
				}
			)
		])
		
		scope.String = Term.emit(
			Term.list([
				Term.string(`"`),
				Term.maybe(
					Term.many(
						Term.regExp(/[^"]/) //"
					)
				),
				Term.string(`"`),
			]),
			([left, inner]) => `Term.string(\`${inner}\`)`
		)
		
		scope.RegExp = Term.emit(
			Term.list([
				Term.string(`/`),
				Term.maybe(
					Term.many(
						Term.regExp(/[^/]/)
					)
				),
				Term.string(`/`),
			]),
			([left, inner]) => `Term.regExp(/${inner}/)`
		)
		
		scope.VerticalList = Term.emit(
			Term.term("VerticalArray", scope),
			(array) => `Term.list([\n${getMargin(array.args.indentSize)}${array}\n${getMargin(array.args.indentSize-1)}])`,
		)
		
		scope.VerticalArray = Term.emit(
			Term.list([
				Term.term("Term", scope),
				Term.many(
					Term.list([
						Term.maybe(Term.term("NewLine", scope)),
						Term.term("Term", scope),
					])
				),
			]),
			([head, tail = []]) => {
				const tails = tail.filter(t => t.success).map(t => t[1])
				return `${head},\n${getMargin(head.args.indentSize)}${tails.join(",\n")}`
			},
		)
		
		scope.HorizontalList = Term.emit(
			Term.except(
				Term.term("HorizontalArray", scope),
				[Term.term("HorizontalList", scope), Term.term("HorizontalDefinition", scope)]
			),
			(array) => `Term.list([${array}])`,
		)
		
		scope.HorizontalArray = Term.emit(
			Term.list([
				Term.term("Term", scope),
				Term.many(
					Term.list([
						Term.maybe(Term.term("Gap", scope)),
						Term.term("Term", scope),
					])
				),
			]),
			([head, tail = []]) => {
				const tails = tail.filter(t => t.success).map(t => t[1])
				return `${head}, ${tails.join(", ")}`
			},
		)
		
		scope.Gap = Term.many(Term.regExp(/[ 	]/))
		
	}
}


//=======//
// Mouse //
//=======//
{

	const Mouse = Habitat.Mouse = {
		position: [undefined, undefined],
	}
	
	const buttonMap = ["Left", "Middle", "Right", "Back", "Forward"]
	
	Reflect.defineProperty(Mouse, "install", {
		value(global) {
			global.Mouse = Mouse
			global.addEventListener("mousedown", e => {
				const buttonName = buttonMap[e.button]
				Mouse[buttonName] = true
			})
			
			global.addEventListener("mouseup", e => {
				const buttonName = buttonMap[e.button]
				Mouse[buttonName] = false
			})
			
			global.addEventListener("mousemove", e => {
				Mouse.position[0] = event.clientX
				Mouse.position[1] = event.clientY
			})
			
			Reflect.defineProperty(Mouse, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
}


//========//
// Number //
//========//
{
	
	const install = (global) => {
		
		Reflect.defineProperty(global.Number.prototype, "to", {
			value: function* (v) {
				let i = this.valueOf()
				if (i <= v) {
					while (i <= v) {
						yield i
						i++
					}
				}
				else {
					while (i >= v) {
						yield i
						i--
					}
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Number.installed = true
		
	}
	
	Habitat.Number = {install}
	
}

//========//
// Object //
//========//
{
	Habitat.Object = {}
	Habitat.Object.install = (global) => {
		
		Reflect.defineProperty(global.Object.prototype, Symbol.iterator, {
			value: function*() {
				for (const key in this) {
					yield this[key]
				}
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "keys", {
			value() {
				return Object.keys(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "values", {
			value() {
				return Object.values(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "entries", {
			value() {
				return Object.entries(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Object.installed = true
		
	}
	
}

//==========//
// Property //
//==========//
{
	
	const install = (global) => {
	
		Reflect.defineProperty(global.Object.prototype, "_", {
			get() {
				return new Proxy(this, {
					set(object, propertyName, descriptor) {
						Reflect.defineProperty(object, propertyName, descriptor)
					},
					get(object, propertyName) {
						const editor = {
							get value() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {value} = descriptor
								return value
							},
							set value(value) {
								const {enumerable, configurable, writable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true, writable: true}
								const descriptor = {value, enumerable, configurable, writable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get get() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {get} = descriptor
								return get
							},
							set get(get) {
								const {set, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get set() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {set} = descriptor
								return set
							},
							set set(set) {
								const {get, enumerable, configurable} = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const descriptor = {get, set, enumerable, configurable}
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get enumerable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {enumerable} = descriptor
								return enumerable
							},
							set enumerable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {configurable: true, writable: true}
								descriptor.enumerable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get configurable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {configurable} = descriptor
								return configurable
							},
							set configurable(v) {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, writable: true}
								descriptor.configurable = v
								Reflect.defineProperty(object, propertyName, descriptor)
							},
							get writable() {
								const descriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {}
								const {writable} = descriptor
								return writable
							},
							set writable(v) {
								const oldDescriptor = Reflect.getOwnPropertyDescriptor(object, propertyName) || {enumerable: true, configurable: true}
								const {get, set, writable, ...rest} = oldDescriptor
								const newDescriptor = {...rest, writable: v}
								Reflect.defineProperty(object, propertyName, newDescriptor)
							},
						}
						return editor
					},
				})
			},
			set(value) {
				Reflect.defineProperty(this, "_", {value, configurable: true, writable: true, enumerable: true})
			},
			configurable: true,
			enumerable: false,
		})
		
		
		Habitat.Property.installed = true
		
	}
	
	Habitat.Property = {install}
	
}

//========//
// Random //
//========//
{
	Habitat.Random = {}
	
	const maxId8 = 2 ** 16
	const u8s = new Uint8Array(maxId8)
	let id8 = maxId8
	const getRandomUint8 = () => {
		
		if (id8 >= maxId8) {
			crypto.getRandomValues(u8s)
			id8 = 0
		}
		
		const result = u8s[id8]
		id8++
		return result
	}
	
	Reflect.defineProperty(Habitat.Random, "Uint8", {
		get: getRandomUint8,
		configurable: true,
		enumerable: true,
	})
	
	const maxId32 = 2 ** 14
	const u32s = new Uint32Array(maxId32)
	let id32 = maxId32
	const getRandomUint32 = () => {
		
		if (id32 >= maxId32) {
			crypto.getRandomValues(u32s)
			id32 = 0
		}
		
		const result = u32s[id32]
		id32++
		return result
	}
	
	Reflect.defineProperty(Habitat.Random, "Uint32", {
		get: getRandomUint32,
		configurable: true,
		enumerable: true,
	})
	
	Habitat.Random.oneIn = (n) => {
		const result = getRandomUint32()
		return result % n === 0
	}
	
	Habitat.Random.maybe = (chance) => {
		return Habitat.Random.oneIn(1 / chance)
	}
	
	Habitat.Random.install = (global) => {
		global.Random = Habitat.Random
		global.oneIn = Habitat.Random.oneIn
		global.maybe = Habitat.Random.maybe
		Habitat.Random.installed = true
	}
	
}

//=======//
// Stage //
//=======//
{
	
	Habitat.Stage = {}
	Habitat.Stage.make = () => {
		
		const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
		
		const stage = {
			canvas,
			context,
			update: () => {},
			draw: () => {},
			tick: () => {
				stage.update()
				stage.draw()
				requestAnimationFrame(stage.tick)
			},
		}
		
		requestAnimationFrame(stage.tick)
		return stage
	}
	
	Habitat.Stage.install = (global) => {
		global.Stage = Habitat.Stage
		Habitat.Stage.installed = true
		
	}
	
}

//======//
// Term //
//======//
{
	
	const Term = {}
	
	const STYLE_SUCCESS = `font-weight: bold; color: rgb(0, 128, 255)`
	const STYLE_FAILURE = `font-weight: bold; color: rgb(255, 70, 70)`
	const STYLE_DEPTH = `font-weight: bold;`
	const log = (result, depth = 5) => {
		
		if (depth < 0) {
			console.log("%cMaximum depth reached", STYLE_DEPTH)
			return
		}
	
		const style = result.success? STYLE_SUCCESS : STYLE_FAILURE
		
		if (result.length === 0) {
			console.log("%c" + result.error, style)
			return
		}
		
		console.groupCollapsed("%c" + result.error, style)
		for (const child of result) {
			log(child, depth - 1)
		}
		console.groupEnd()
		
	}
	
	Term.result = ({success, source, output = source, tail, term, error = "", children = []} = {}) => {
		const self = (input = "", args = {exceptions: []}) => {			
			const result = [...children]
			result.success = success
			result.output = output
			result.source = source
			result.tail = tail === undefined? input : tail
			result.term = term
			result.error = error
			
			result.input = input
			result.args = cloneArgs(args)
			result.toString = function() { return this.output }
			result.log = (depth) => {
				log(result, depth)
				return result
			}
			return result
		}
		return self
	}
	
	Term.succeed = (properties = {}) => Term.result({...properties, success: true})
	Term.fail    = (properties = {}) => Term.result({...properties, success: false})
	
	Term.string = (string) => {
		const term = (input = "", args = {exceptions: []}) => {
			const snippet = input.slice(0, term.string.length)
			const success = snippet === term.string
			if (!success) return Term.fail({
				term,
				error: `Expected '${term.string}' but found '${snippet}'`,
			})(input, args)
			return Term.succeed({
				source: term.string,
				tail: input.slice(term.string.length),
				term,
				children: [],
				error: `Found '${term.string}'`
			})(input, args)
		}
		term.string = string
		return term
	}
	
	Term.regExp = (regExp) => {
		const term = (input = "", args = {exceptions: []}) => {
			const finiteRegExp = new RegExp("^" + term.regExp.source + "$")
			let i = 0
			while (i <= input.length) {
				const snippet = input.slice(0, i)
				const success = finiteRegExp.test(snippet)
				if (success) return Term.succeed({
					source: snippet,
					tail: input.slice(snippet.length),
					term,
					children: [],
					error: `Found /${term.regExp.source}/ with '${snippet}'`,
				})(input, args)
				i++
			}
			return Term.fail({
				term,
				error: `Expected /${term.regExp.source}/ but found: '${input}'`,
			})(input, args)
		}
		term.regExp = regExp
		return term
	}
	
	const cloneArgs = (args = {exceptions: []}) => {
		const clone = {...args}
		if (args.exceptions !== undefined) clone.exceptions = [...args.exceptions]
		return clone
	}
	
	Term.list = (terms) => {
		const self = (input = "", args = {exceptions: []}) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (state.i < self.terms.length) {
				const clonedArgs = cloneArgs(args)
				const term = self.terms[state.i]
				const result = term(state.input, clonedArgs)
				results.push(result)
				if (!result.success) break
				else {
					state.input = result.tail
				}
				state.i++
			}
			
			const success = state.i >= self.terms.length
			if (!success) {
				const error = `Expected list of ${self.terms.length} terms`
				return Term.fail({
					self,
					children: results,
					error,
					term: self,
				})(input, args)
			}
			
			const error = `Found list of ${self.terms.length} terms`
			return Term.succeed({
				output: results.map(result => result.output).join(""),
				source: results.map(result => result.source).join(""),
				tail: state.input,
				term: self,
				children: results,
				error,
			})(input, args)
			
		}
		self.terms = terms
		return self
	}
	
	Term.or = (terms) => {
		const self = (input = "", args = {exceptions: []}) => {
			
			const state = {
				i: 0,
				exceptions: args.exceptions === undefined? [] : [...args.exceptions]
			}
			const results = []
			
			const terms = self.terms
			
			while (state.i < terms.length) {
				const term = terms[state.i]
				const newArgs = {...args}
				newArgs.exceptions = [...state.exceptions]
				if (state.exceptions.includes(term)) {
					state.i++
					state.exceptions = state.exceptions.filter(e => e !== term)
					continue
				}
				const result = term(input, newArgs)
				results.push(result)
				if (result.success) {
					const rejects = results.slice(0, -1)
					for (const i in rejects) {
						const reject = rejects[i]
						reject.error = `Reject ${Number(i) + 1} of ${rejects.length}: ` + reject.error
					}
					rejects.error = `Rejected ${rejects.length}`
					return Term.succeed({
						output: result.output,
						source: result.source,
						tail: result.tail,
						term: self,
						error: `Found choice ${state.i + 1} of ${terms.length}: ` + result.error,
						children: [...result, rejects]
					})(input, args)
				}
				state.i++
			}
			
			return Term.fail({
				term: self,
				error: `Expected one of ${terms.length} terms`,
				children: results,
			})(input, args)
		}
		self.terms = terms
		return self
	}
	
	Term.maybe = (term) => {
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, args)
			if (!result.success) {
				result.success = true
				result.source = result.source === undefined? "": result.source
				result.output = result.output === undefined? "": result.output
			}
			result.error = `(Optional) ` + result.error
			result.term = self
			return result
		}
		self.term = term
		return self
	}
	
	Term.many = (term) => {
		const self = (input = "", args = {exceptions: []}) => {
			
			const state = {
				input,
				i: 0,
			}
			
			const results = []
			
			while (true) {
				const clonedArgs = cloneArgs(args)
				const result = self.term(state.input, clonedArgs)
				results.push(result)
				if (!result.success) break
				state.input = result.tail
				state.i++
			}
			
			const success = results.length > 1
			if (!success) {
				return Term.fail({
					term: self,
					children: results,
					error: `Expected multiple terms`,
				})(input, args)
			}
			
			return Term.succeed({
				output: results.map(result => result.output).join(""),
				source: results.map(result => result.source).join(""),
				tail: state.input,
				term: self,
				children: results,
				error: `Found ${results.length-1} terms`,
			})(input, args)
		}
		self.term = term
		return self
	}
	
	Term.args = (term, func) => {
		const self = (input = "", args = {exceptions: []}) => {
			const newArgs = self.func(cloneArgs(args), input)
			const result = self.term(input, newArgs)
			result.term = self
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.emit = (term, func) => {
		if (typeof func !== "function") {
			const value = func
			func = () => value
		}
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, args)
			result.term = self
			if (result.success) result.output = self.func(result)
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.error = (term, func) => {
		if (typeof func !== "function") {
			const value = func
			func = (result) => {
				if (!result.success) return value
				else return result.error
			}
		}
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, args)
			result.error = self.func(result)
			result.term = self
			return result
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.check = (term, func) => {
		if (typeof func !== "function") {
			const value = func
			func = () => value
		}
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, args)
			if (!result.success) {
				result.term = self
				return result
			}
			const checkResult = self.func(result)
			if (checkResult) {
				result.error = `Passed check: ` + result.error
				return result
			}
			return Term.fail({
				term: self,
				children: [...result],
				error: `Failed check: ` + result.error,
			})(input, args)
		}
		self.term = term
		self.func = func
		return self
	}
	
	Term.eof = (input = "", args = {exceptions: []}) => {
		if (input.length === 0) return Term.succeed({
			source: "",
			tail: "",
			term: Term.eof,
			error: `Found end of file`,
		})(input, args)
		return Term.fail({
			term: Term.eof,
			error: `Expected end of file but got '${input}'`,
		})(input, args)
	}
	
	Term.except = (term, exceptions) => {
		const self = (input = "", args = {exceptions: []}) => {
			const exceptions = args.exceptions === undefined? [] : args.exceptions
			const result = self.term(input, {...args, exceptions: [...exceptions, ...self.exceptions]})
			result.term = self
			return result
		}
		self.term = term
		self.exceptions = exceptions
		return self
	}
	
	Term.any = (term) => {
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, {...args, exceptions: []})
			result.term = self
			return result
		}
		self.term = term
		return self
	}
	
	const getResultKey = (name, input = "", args = {exceptions: []}) => {
		const lines = []
		lines.push(name)
		lines.push(input)
		for (const key in args) {
			if (key === "exceptions") {
				lines.push("exceptions:" + args.exceptions.map(exception => exception.id.toString()))
				continue
			}
			const value = args[key]
			if (typeof value === "number") {
				lines.push(key + ":" + value)
				continue
			}
			
			if (typeof value === "string") {
				lines.push(key + `:"` + value + `"`)
				continue
			}
			
			if (typeof value === "boolean") {
				lines.push(key + `:` + value)
				continue
			}
			
			throw new Error("[Habitat.Term] Unimplemented: I don't know how to cache these arguments correctly...")
		}
		return lines.join("|")
	}
	
	const termCaches = new Map()
	let termCount = 0
	Term.terms = []
	
	const resultCachess = []
	Term.resetCache = () => {
		for (const caches of resultCachess) {
			caches.clear()
		}
	}
	
	const getValue = (object, key) => {
		if (object === undefined) return
		const [head, ...tail] = key.split(".")
		if (tail.length === 0) return object[head]
		const result = getValue(object[head], tail.join("."))
		if (result !== undefined) return result
		return getValue(object, tail.join("."))
	}
	
	const setValue = (object, key, value) => {
		const [head, tail] = key.split(".")
		if (tail === undefined) {
			object[head] = value
			return
		}
		return setValue(object[head], tail, value)
	}
	
	Term.export = (term, global, name) => {
		global[name] = term
		return term
	}
	
	Term.term = (key, object) => {
		
		// Get term from cache
		let termCache = termCaches.get(object)
		if (termCache === undefined) {
			termCache = {}
			termCaches.set(object, termCache)
		}
		
		if (termCache[key] !== undefined) {
			return termCache[key]
		}
		
		// Create term
		const resultCaches = new Map()
		resultCachess.push(resultCaches)
		const id = termCount++
		
		const self = (input = "", args = {exceptions: []}) => {
			
			const resultKey = getResultKey(key, input, args)
			const resultCache = resultCaches.get(resultKey)
			if (resultCache !== undefined) {
				//print("Use cache for:", resultKey)
				return resultCache
			}
			
			const term = getValue(object, key)
			
			if (term === undefined) {
				throw new Error(`[Habitat.Term] Unrecognised term: '${key}'`)
			}
			const result = term(input, args)
			if (result.success) {
				result.error = `Found ${key}: ` + result.error
			}
			else {
				result.error = `Expected ${key}: ` + result.error
			}
			
			const cachedResult = Term.result({
				success: result.success,
				source: result.source,
				output: result.output,
				tail: result.tail,
				term: result.term,
				error: `(Cached) ` + result.error,
				children: [...result],
			})(input, args)
			
			resultCaches.set(resultKey, cachedResult)
			
			return result
		}
		
		self.id = id
		Term.terms[id] = key
		termCache[key] = self
		
		return self
	}
	
	Term.chain = (first, second) => {
		const self = (input = "", args = {exceptions: []}) => {
			const firstResult = self.first(input, args)
			if (!firstResult.success) {
				firstResult.error = `(Chained) ` + firstResult.error
				return firstResult
			}
			
			const secondResult = self.second(firstResult.output, args)
			//secondResult.error = `Found translation: ` + firstResult.error + "\n\n" + secondResult.error
			return secondResult
			
		}
		self.first = first
		self.second = second
		return self
	}
	
	Term.subTerm = (term, name, value) => {
		if (term[name] !== undefined) {
			throw new Error(`[Habitat.Term] Sub-term '${name}' is already declared`)
		}
		term[name] = value
		return term
	}
	
	Term.subTerms = (term, subTerms) => {
		for (const [name, value] of subTerms) {
			if (term[name] !== undefined) throw new Error(`[Habitat.Term] Sub-term '${name}' is already declared`)
			term[name] = value
		}
		return term
	}
	
	Term.select = (term, ids) => {
		const self = (input = "", args = {exceptions: []}) => {
			const result = self.term(input, args)
			const children = ids.map(id => result[id])
			return Term.result({
				success: result.success,
				output: result.output,
				source: result.source,
				tail: result.tail,
				term: result.term,
				error: result.error,
				children,
			})(input, args)
		}
		self.term = term
		self.ids = ids
		return self
	}
	
	Habitat.Term = Term
	Habitat.Term.install = (global) => {
		global.Term = Habitat.Term	
		Habitat.Term.installed = true
	}
	
	
	
}


//=======//
// Touch //
//=======//
{

	const Touch = Habitat.Touch = []
	
	const trim = (a) => {
		if (a.length == 0) return a
		let start = a.length - 1
		let end = 0
		for (let i = 0; i < a.length; i++) {
			const value = a[i]
			if (value !== undefined) {
				start = i
				break
			}
		}
		for (let i = a.length - 1; i >= 0; i--) {
			const value = a[i]
			if (value !== undefined) {
				end = i + 1
				break
			}
		}
		a.splice(end)
		a.splice(0, start)
		return a
	}
	
	Reflect.defineProperty(Touch, "install", {
		value(global) {
			
			global.Touch = Touch
			global.addEventListener("touchstart", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touch[id] === undefined) Touch[id] = [undefined, undefined]
					const touch = Touch[id]
					touch[0] = x
					touch[1] = y
				}
			})
			
			global.addEventListener("touchmove", e => {
				for (const changedTouch of e.changedTouches) {
					const x = changedTouch.clientX
					const y = changedTouch.clientY
					const id = changedTouch.identifier
					if (Touch[id] === undefined) Touch[id] = {position: [undefined, undefined]}
					const touch = Touch[id]
					touch.position[0] = x
					touch.position[1] = y
				}
			})
			
			global.addEventListener("touchend", e => {
				for (const changedTouch of e.changedTouches) {
					const id = changedTouch.identifier
					Touch[id] = undefined
				}
				trim(Touch)
			})
			
			
			Reflect.defineProperty(Touch, "installed", {
				value: true,
				configurable: true,
				enumerable: false,
				writable: true,
			})
		},
		configurable: true,
		enumerable: false,
		writable: true,
	})
	
	
}


//======//
// Type //
//======//
{

	const Int = {
		check: (n) => n % 1 == 0,
		convert: (n) => parseInt(n),
	}

	const Positive = {
		check: (n) => n >= 0,
		convert: (n) => Math.abs(n),
	}

	const Negative = {
		check: (n) => n <= 0,
		convert: (n) => -Math.abs(n),
	}

	const UInt = {
		check: (n) => n % 1 == 0 && n >= 0,
		convert: (n) => Math.abs(parseInt(n)),
	}

	const UpperCase = {
		check: (s) => s == s.toUpperCase(),
		convert: (s) => s.toUpperCase(),
	}

	const LowerCase = {
		check: (s) => s == s.toLowerCase(),
		convert: (s) => s.toLowerCase(),
	}

	const WhiteSpace = {
		check: (s) => /^[ |	]*$/.test(s),
	}

	const PureObject = {
		check: (o) => o.constructor == Object,
	}

	const Primitive = {
		check: p => p.is(Number) || p.is(String) || p.is(RegExp) || p.is(Symbol),
	}
	
	const install = (global) => {
	
		global.Int = Int
		global.Positive = Positive
		global.Negative = Negative
		global.UInt = UInt
		global.UpperCase = UpperCase
		global.LowerCase = LowerCase
		global.WhiteSpace = WhiteSpace
		global.PureObject = PureObject
		global.Primitive = Primitive
	
		Reflect.defineProperty(global.Object.prototype, "is", {
			value(type) {
				if ("check" in type) {
					try { return type.check(this) }
					catch {}
				}
				try   { return this instanceof type }
				catch { return false }
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Reflect.defineProperty(global.Object.prototype, "as", {
			value(type) {
				if ("convert" in type) {
					try { return type.convert(this) }
					catch {}
				}
				return type(this)
			},
			configurable: true,
			enumerable: false,
			writable: true,
		})
		
		Habitat.Type.installed = true
		
	}
	
	Habitat.Type = {install, Int, Positive, Negative, UInt, UpperCase, LowerCase, WhiteSpace, PureObject, Primitive}
	
}