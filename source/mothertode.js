//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Habitat.MotherTode.scope.Source(source, {indentSize: 0})
		if (!result.success) {
			console.error(`[MotherTode]`, result.error)
			return
		}
		const func = new Function("scope", "return " + result.output.d)
		const finalResult = func()
		return finalResult
	}
	
	Habitat.MotherTode.scope = {}
	
	Habitat.MotherTode.install = (global) => {
		global.MotherTode = Habitat.MotherTode	
		Habitat.MotherTode.installed = true
		
		// Shorthand
		const scope = Habitat.MotherTode.scope
		const Term = Habitat.Term
		
		//========//
		// Source //
		//========//
		scope.Source = Term.emit(
			Term.list([
				Term.term("SourceInner", scope),
				Term.eof,
			]),
			([{output}]) => output,
		)
		
		scope.SourceInner = Term.or([
			Term.term("Term", scope),
			//Term.term("TermLiteralInner", scope),
		])
		
		//======//
		// Term //
		//======//
		scope.Term = Term.or([
			Term.term("HorizontalList", scope),
			Term.term("VerticalGroup", scope),
			Term.term("VerticalGroupSingle", scope),
			Term.term("HorizontalGroup", scope),
			Term.term("HorizontalGroupSingle", scope),
			Term.term("String", scope),
			Term.term("RegExp", scope),
			//Term.term("TermReference", scope),
		])
		
		//========//
		// Basics //
		//========//
		scope.Letter = Term.regExp(/[a-zA-Z_$]/)
		scope.TermName = Term.many(Term.term("Letter", scope))
		scope.Gap = Term.maybe(Term.many(Term.regExp(/[ |	]/)))
		
		//========//
		// Indent //
		//========//
		scope.Indent = Term.check(
			Term.list([
				Term.term("Gap", scope),
				Term.string("\n"),
				Term.term("Gap", scope),
			]),
			(indent) => {
				const [gap, newline, margin] = indent
				indent.args.indentSize++
				return margin.output === ["	"].repeat(indent.args.indentSize).join("")
			},
		)
		
		scope.Unindent = Term.error(
			Term.check(
				Term.list([
					Term.term("Gap", scope),
					Term.string("\n"),
					Term.term("Gap", scope),
				]),
				(indent) => {
					const [gap, newline, margin] = indent
					indent.args.indentSize--
					return margin.output === ["	"].repeat(indent.args.indentSize).join("")
				},
			),
			([gap, newline, indent]) => `UNINDENT ERROR`
		)
		
		scope.NewLine = Term.error(
			Term.check(
				Term.list([
					Term.term("Gap", scope),
					Term.string("\n"),
					Term.term("Gap", scope),
				]),
				(indent) => {
					const [gap, newline, margin] = indent
					return margin.output === ["	"].repeat(indent.args.indentSize).join("")
				},
			),
			([gap, newline, indent]) => `UNINDENT ERROR`
		)
		
		//===========//
		// Primitive //
		//===========//
		scope.String = Term.emit(
			Term.list([
				Term.string('"'),
				Term.maybe(Term.many(Term.regExp(/[^"]/))),  //"
				Term.string('"'),
			]),
			([left, inner, right]) => `Term.string(\`${inner}\`)`
		)
		
		scope.RegExp = Term.emit(
			Term.list([
				Term.string('/'),
				Term.maybe(Term.many(Term.regExp(/[^/]/))),
				Term.string('/'),
			]),
			([left, inner, right]) => `Term.regExp(/${inner}/)`
		)
		
		// Can't do this yet until I've made declarations
		/*scope.TermReference = Term.emit(
			Term.term("TermName", scope),
			(name) => `Term.term(\`${name}\`, scope)`
		)*/
		
		//================//
		// HorizontalList //
		//================//
		scope.HorizontalList = Term.emit(
			Term.term("HorizontalListInner", scope),
			(line) => `Term.list([${line}])`,
		)
		
		scope.HorizontalListInner = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("HorizontalList", scope)]),
				Term.term("Gap", scope),
				Term.or([
					Term.term("HorizontalListInner", scope),
					Term.except(Term.term("Term", scope), [Term.term("HorizontalList", scope)]),
				]),
			]),
			([left, gap, right]) => `${left}, ${right}`,
		)
		
		//=================//
		// HorizontalGroup //
		//=================//
		scope.HorizontalGroup = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Gap", scope),
				Term.term("HorizontalListInner", scope),
				Term.term("Gap", scope),
				Term.string(")"),
			]),
			([open, gap, inner]) => `Term.list([` + inner + `])`,
		)
		
		scope.HorizontalGroupSingle = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Gap", scope),
				Term.term("Term", scope),
				Term.term("Gap", scope),
				Term.string(")"),
			]),
			([open, gap, inner]) => inner.output,
		)
		
		//===============//
		// VerticalGroup //
		//===============//
		scope.VerticalGroup = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Indent", scope),
				Term.term("VerticalGroupInner", scope),
				Term.term("Unindent", scope),
				Term.string(")"),
			]),
			([open, indent, inner]) => `Term.list([\n` + inner.output.split("\n").map(l => "	".repeat(indent.args.indentSize) + l).join("\n") + `\n])`,
		)
		
		scope.VerticalGroupInner = Term.emit(
			Term.list([
				Term.term("Term", scope),
				Term.term("NewLine", scope),
				Term.or([
					Term.term("VerticalGroupInner", scope),
					Term.term("Term", scope),
				]),
			]),
			([left, gap, right]) => `${left},\n${right}`,
		)
		
		scope.VerticalGroupSingle = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Indent", scope),
				Term.term("Term", scope),
				Term.term("Unindent", scope),
				Term.string(")"),
			]),
			([open, indent, inner]) => inner.output,
		)
		
		
	}
}
