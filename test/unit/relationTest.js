define(
	['model/relation', 'model/concept'], 
	function(Relation, Concept){
		test('make link', function(){
			var c1 = new Concept();
			var c2 = new Concept();
			ok ( c1.isLinkedTo(c2) === false);	
			var relation = c1.linkTo(c2, 'linked');
			ok ( relation !== null );
			ok ( c1.isLinkedTo(c2) === true);	
			equal(c1, relation.endpointA);
			equal(1, c1.relations.length);
			equal(c2, relation.endpointB);
			equal(1, c2.relations.length);
			equal(c1.relations[0], c2.relations[0]);
			equal('linked', relation.text);

		});

		test('unlink', function(){
			var c1 = new Concept();
			var c2 = new Concept();
			var relation = c1.linkTo(c2, 'linked');
			relation.unlink();

			equal(null, relation.endpointA);
			equal(0, c1.relations.length);
			equal(null, relation.endpointB);
			equal(0, c2.relations.length);

			ok ( c1.isLinkedTo(c2) === false);
			ok ( c2.isLinkedTo(c1) === false);
		});

		test("포함관계 테스트", function(){
			var c1 = new Concept();
			var c2 = new Concept();
			var relation = c1.linkTo(c2, 'linked');

			ok ( relation.isLinked(c1) );
			ok ( relation.isLinked(c2) );
			ok ( c1.isLinkedTo(c2) );
			ok ( c2.isLinkedTo(c1) );
		});

		test('중복 link 방지', function(){
			var c1 = new Concept();
			var c2 = new Concept();
			var relation1 = c1.linkTo(c2, 'linked');
			var relation2 = c1.linkTo(c2, 'linked');
			ok( relation2 === null, "중복 추가 시도시 null 반환");
			equal(1, c1.relations.length, "추가되지 않았기 때문에 1개만 있어야 함");
			equal(1, c2.relations.length, "추가되지 않았기 때문에 1개만 있어야 함");
		});
	}
);