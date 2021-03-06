//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		Term.resetCache()
		const source = String.raw(...args)
		print(source)
		const result = Term.term("MotherTode", Habitat.MotherTode.scope)(source, {exceptions: [], indentSize: 0})
		if (!result.success) {
			//result.log()
			return result
		}
		
		const func = new Function("scope", "return " + result.output.d)
		
		const globalScope = {}
		const term = func(globalScope)
		term.success = result.success
		term.output = result.output
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
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
		
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
			
			Term.term("Group", scope),
			Term.term("MaybeGroup", scope),
			Term.term("AnyGroup", scope),
			Term.term("OrGroup", scope),
			Term.term("String", scope),
			Term.term("RegExp", scope),
			Term.term("NoExceptions", scope),
		])
		
		const makeDefinition = (options = {}) => {
			const {
				match = `Term.string("")`,
				emit,
				check,
				error,
				chain,
				args,
				subTerm,
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
				const subTermsCode = subTerm.map(([name, value]) => `["${name}", ${value}]`).join(", ")
				definition = `Term.subTerms(${definition}, [${subTermsCode}])`
				/*for (const s of subTerm) {
					const [name, value] = s
					definition = `Term.subTerm(${definition}, "${name}", ${value})`
				}*/
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
		]
		
		scope.HorizontalDefinition = Term.emit(
			Term.list([
				Term.term("DefinitionEntry", scope),
				Term.maybe(
					Term.many(
						Term.list([
							Term.term("Gap", scope),
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
				
			}
		)
		
		scope.DefinitionEntry = Term.or([
			Term.term("Declaration", scope),
			Term.term("DefinitionProperty", scope),
		])
		
		scope.Name = Term.many(Term.regExp(/[a-zA-Z_$]/))
		
		scope.Declaration = Term.emit(
			Term.list([
				Term.term("Name", scope),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("Term", scope),
			]),
			([name, gap, term]) => {
				return `{subTerm: ["${name}", "${term}"]},`
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
		
		scope.MatchProperty = Term.emit(
			Term.list([
				Term.string("::"),
				Term.maybe(Term.term("Gap", scope)),
				Term.except(Term.term("Term", scope), []),
			]),
			([operator, gap, term = {}]) => `{match: \`${term.output}\`}, `,
		)
		
		scope.ChainProperty = Term.emit(
			Term.list([
				Term.string("++"),
				Term.maybe(Term.term("Gap", scope)),
				Term.except(Term.term("Term", scope), []),
			]),
			([operator, gap, term = {}]) => `{chain: \`${term.output}\`}, `,
		)
		
		scope.EmitProperty = Term.emit(
			Term.list([
				Term.string(">>"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{emit: \`${term.output}\`},`,
		)
		
		scope.CheckProperty = Term.emit(
			Term.list([
				Term.string("??"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{check: \`${term.output}\`},`,
		)
		
		scope.ErrorProperty = Term.emit(
			Term.list([
				Term.string("!!"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{error: \`${term.output}\`},`,
		)
		
		scope.ArgsProperty = Term.emit(
			Term.list([
				Term.string("@@"),
				Term.maybe(Term.term("Gap", scope)),
				Term.term("JavaScript", scope),
			]),
			([operator, gap, term = {}]) => `{args: \`${term.output}\`},`,
		)
		
		scope.JavaScript = Term.or([
			Term.term("JavaScriptMultiple", scope),
			Term.term("JavaScriptSingle", scope),
		])
		
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
				Term.string("+"),
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
				Term.term("Term", scope),
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
			Term.maybe(Term.term("Gap", scope)),
			Term.string("\n"),
			Term.term("Margin", scope),
		])
		
		scope.Unindent = Term.list([
			Term.maybe(Term.term("Gap", scope)),
			Term.string("\n"),
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
			([left, inner]) => `Term.string('${inner}')`
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
