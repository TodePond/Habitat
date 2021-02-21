//============//
// MotherTode //
//============//
{
	
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
		Term.term("LineLiteral", scope),
		Term.term("ListLiteral", scope),
		Term.term("StringLiteral", scope),
		Term.term("RegExpLiteral", scope),
		Term.term("TermReference", scope),
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
	// TODO: Indent, Unindent, NewLine
	
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
	
	scope.TermReference = Term.emit(
		Term.term("TermName", scope),
		(name) => `Term.term(\`${name}\`, scope)`
	)
	
	//======//
	// Line //
	//======//
	scope.LineLiteral = Term.emit(
		Term.term("LineInner", scope),
		(line) => `Term.list([${line}])`,
	)
	
	scope.LineInner = Term.emit(
		Term.list([
			Term.except(Term.term("Term", scope), [Term.term("LineLiteral", scope)]),
			Term.term("Gap", scope),
			Term.or([
				Term.term("LineInner", scope),
				Term.except(Term.term("Term", scope), [Term.term("LineLiteral", scope)]),
			]),
		]),
		([left, gap, right]) => `${left}, ${right}`,
	)
	
	//======//
	// List //
	//======//
	scope.ListLiteral = Term.emit(
		Term.list([
			Term.string("("),
			Term.term("Indent", scope),
			Term.term("List", scope),
			Term.term("Unindent", scope),
			Term.string(")"),
		]),
		(list) => `Term.list([\n${list}\n])`,
	)
	
	
	
}
