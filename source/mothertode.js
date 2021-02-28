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
			result.log()
			return result
		}
		
		const func = new Function("scope", "return " + result.output.d)
		const term = func()		
		term.success = result.success
		term.output = result.output
		term.source = result.source
		term.tail = result.tail
		term.input = result.input
		term.args = result.args
		term.error = result.error
		term.log = () => {
			//console.log(result.output)
			result.log()
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
			Term.term("HorizontalList", scope),
			Term.term("Group", scope),
			Term.term("String", scope),
			Term.term("RegExp", scope),
		])
		
		scope.Group = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("GroupInner", scope),
				Term.string(")"),
			]),
			([left, inner]) => `${inner}`,
		)
		
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
					Term.term("VerticalList", scope),
					Term.term("Term", scope),
				]),
				Term.term("Unindent", scope),
			]),
			([left, inner]) => `${inner}`,
		)
		
		scope.Margin = Term.check(
			Term.maybe(Term.term("Gap", scope)),
			(gap) => `${gap}`.length === gap.args.indentSize,
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
		
		const getMargin = (size) => [`	`].repeat(size).join("")
		
		scope.HorizontalList = Term.emit(
			Term.except(
				Term.term("HorizontalArray", scope),
				[Term.term("HorizontalList", scope)]
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
		
		scope.Gap = Term.many(Term.regExp(/[ |	]/))
		
	}
}
