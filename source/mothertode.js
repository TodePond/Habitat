//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Habitat.MotherTode.scope.Source(source, {indentSize: 0})
		if (!result.success) {
			throw new Error(`[MotherTode]\n\n` + result.error + `\n\n`)
			return
		}
		const func = new Function("scope", "return " + result.output.d)
		const scope = {}
		const finalResult = func({scope})
		finalResult.scope = scope
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
		])
		
		//======//
		// Term //
		//======//
		scope.Term = Term.or([
			Term.term("HorizontalListLiteral", scope),
			Term.term("VerticalListLiteral", scope),
			Term.term("StringLiteral", scope),
			Term.term("RegExpLiteral", scope),
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
		
		//===========//
		// Primitive //
		//===========//
		scope.StringLiteral = Term.emit(
			Term.list([
				Term.string('"'),
				Term.maybe(Term.many(Term.regExp(/[^"]/))),  //"
				Term.string('"'),
			]),
			([left, inner, right]) => `Term.string(\`${inner}\`)`
		)
		
		scope.RegExpLiteral = Term.emit(
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
		scope.HorizontalListLiteral = Term.emit(
			Term.term("HorizontalListLiteralInner", scope),
			(line) => `Term.list([${line}])`,
		)
		
		scope.HorizontalListLiteralInner = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("HorizontalListLiteral", scope)]),
				Term.term("Gap", scope),
				Term.or([
					Term.term("HorizontalListLiteralInner", scope),
					Term.except(Term.term("Term", scope), [Term.term("HorizontalListLiteral", scope)]),
				]),
			]),
			([left, gap, right]) => `${left}, ${right}`,
		)
		
		//==============//
		// VerticalList //
		//==============//
		scope.VerticalListLiteral = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Indent", scope),
				Term.term("VerticalListLiteralInner", scope),
				Term.term("Unindent", scope),
				Term.string(")"),
			]),
			([open, indent, inner]) => `Term.list([\n` + inner + `\n])`,
		)
		
		scope.VerticalListLiteralInner = Term.term("Term", scope)
		
		
	}
}
