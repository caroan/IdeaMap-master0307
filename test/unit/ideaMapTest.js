define(
	['model/ideamap'], 
	function(IdeaMap){
		test('Initial properties of ideaMap', function(){
			var idea = new IdeaMap();
			equal(0, idea.concepts.length);
		});

		test('Add concept', function(){
			var idea = new IdeaMap();
			var callbacked = false;
			idea.listen(function(source, propertyName, newValue, oldValue){
				callbacked = true;
				equal(idea, source);
				equal('concepts', propertyName);
				ok( newValue !== null);
				ok( oldValue === undefined);
			});
			var c = idea.newConcept('hello', 100, 200);
			
			ok(callbacked);
			equal(1, idea.concepts.length);
			equal(c, idea.concepts[0]);

		});

		test('Link 2 concepts', function(){
			var idea = new IdeaMap();
			var c1 = idea.newConcept('hello', 100, 200);
			var c2 = idea.newConcept('world', 200, 300);
			var relation = idea.link(c1, c2, "binded");
			equal(c1, relation.endpointA);
			equal(c2, relation.endpointB);
			equal("binded", relation.text);
			equal(1, idea.relations.length);
			equal(relation, idea.relations[0]);
		});

		test('unlink 2 concepts', function(){
			var idea = new IdeaMap();
			var c1 = idea.newConcept('hello', 100, 200);
			var c2 = idea.newConcept('world', 200, 300);
			var relation = idea.link(c1, c2, "binded");

			idea.unlink(relation);
			equal(0, idea.relations.length);
		});



	}
);