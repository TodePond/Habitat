//============//
// MotherTode //
//============//
{

	
	
	Habitat.MotherTode = (...args) => {
		const source = String.raw(...args)
		const result = Term.term("MotherTode", Habitat.MotherTode.scope)(source, {indentSize: 0})
		if (!result.success) {
			console.error(`MotherTode Error`)
			result.log()
			return result
		}
		const func = new Function("scope", "return " + result.output.d)
		const finalResult = func()
		
		finalResult.success = result.success
		finalResult.output = result.output
		finalResult.source = result.source
		finalResult.tail = result.tail
		finalResult.input = result.input
		finalResult.args = result.args
		finalResult.error = result.error
		finalResult.log = () => {
			result.log()
			return finalResult
		}
		
		for (let i = 0; i < result.length; i++) {
			finalResult[i] = result[i]
		}
		
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
		scope.MotherTode = Term.error(
			Term.emit(
				Term.list([
					Term.term("GroupInner", scope),
					Term.eof,
				]),
				([{output}]) => output,
			),
			(result) => result.error,
		)
		
		//======//
		// Term //
		//======//
		scope.Term = Term.or([
			Term.term("List", scope),
			Term.term("Maybe", scope),
			Term.term("Many", scope),
			Term.term("Group", scope),
			Term.term("String", scope),
			Term.term("RegExp", scope),
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
		
		scope.Unindent = Term.check(
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
		)
		
		scope.NewLine = Term.check(
			Term.list([
				Term.term("Gap", scope),
				Term.string("\n"),
				Term.term("Gap", scope),
			]),
			(indent) => {
				const [gap, newline, margin] = indent
				return margin.output === ["	"].repeat(indent.args.indentSize).join("")
			},
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
		
		//===========//
		// Operators //
		//===========//
		scope.Many = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Many", scope)]),
				Term.term("Gap", scope),
				Term.string("+"),
			]),
			([term]) => `Term.many(${term})`,
		)
		
		scope.Maybe = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("Maybe", scope)]),
				Term.term("Gap", scope),
				Term.string("?"),
			]),
			([term]) => `Term.maybe(${term})`,
		)
		
		//======//
		// List //
		//======//
		scope.List = Term.emit(
			Term.term("ListInner", scope),
			(line) => `Term.list([${line}])`,
		)
		
		scope.ListInner = Term.emit(
			Term.list([
				Term.except(Term.term("Term", scope), [Term.term("List", scope)]),
				Term.term("Gap", scope),
				Term.or([
					Term.term("ListInner", scope),
					Term.except(Term.term("Term", scope), [Term.term("List", scope)]),
				]),
			]),
			([left, gap, right]) => `${left}, ${right}`,
		)
		
		//=======//
		// Group //
		//=======//
		scope.Group = Term.emit(
			Term.list([
				Term.string("("),
				Term.term("Gap", scope),
				Term.any(Term.term("GroupInner", scope)),
				Term.term("Gap", scope),
				Term.string(")"),
			]),
			([bracket, gap, inner]) => inner.output,
		)
		
		scope.GroupInner = Term.emit(
			Term.term("Term", scope),
			(term) => term.output,
		)
		
	}
}
