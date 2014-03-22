/*
Model 전체에 대한 Facade 역활을 수행한다. 

*/
define(
	['underscore','straps', 'model/entity', 'model/concept'], 
	function(_, Base, Entity, Concept){

		var IdeaMap = Base.extend(Entity, {
			initialize: function(){
				this.concepts = [];
				this.relations = [];
			},

			newConcept: function(text, x, y){
				var c = new Concept();
				c.text = text;
				c.x = x;
				c.y = y;
				this.addConcept(c);
				return c;
			},

			addConcept: function(concept){
				this.concepts.push(concept);
				this.fireChanged('concepts', concept);
			},

			link: function(concept1, concept2, text) {
				var relation = concept1.linkTo(concept2, text);
				this.addRelation(relation);
				return relation;
			},

			addRelation: function(relation) {
				this.relations.push(relation);
				this.fireChanged('relations', relation);
			},

			unlink: function(relation){
				relation.unlink();
				this.relations.pop(relation);
				this.fireChanged('relations', null, relation);
			},
		});

		return IdeaMap;
	}
);