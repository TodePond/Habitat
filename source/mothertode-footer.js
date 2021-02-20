//============//
// MotherTode //
//============//
{
	Habitat.MotherTode.scope = {MotherTode: {}}
	
	const scope = Habitat.MotherTode.scope.MotherTode
	const Term = Habitat.Term
	
	scope.Term = Term.or([
		Term.term("StringLiteral", scope)
	])
	
	scope.StringLiteral = Term.emit(
		Term.list([
			Term.string('"'),
			Term.maybe(Term.many(Term.regExp(/[^"]/))),  //"
			Term.string('"'),
		]),
		([left, inner, right]) => `Term.string(\`${inner}\`)`
	)
	
}
