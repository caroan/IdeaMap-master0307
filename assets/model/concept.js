/**
컨셉맵에서 핵심이 되는 컨셉에 대한 모델 클래스. 
*/
define(
	/*
		underscore - common util for js
		straps.js - Class inheritance library with support for bean-style accessors*
	*/
	['underscore' , 'straps','model/entity', 'model/relation'], 
	function( _, Base,  Entity, Relation) {
		// Base는 straps 에서 제공된다.  
		// 여기서는 Base와 Entity 다중 상속을 하고 있다.
		var Concept = Base.extend( Entity, { 
			initialize: function() {
				this._text = "";
				this.ui = {};
        		this.relations = [];
    		},
    		getText:function(){
    			return this._text;
    		},
    		setText:function(newText){
    			var oldValue = this._text;
    			this._text = newText;
    			this.fireChanged('text', this._text, oldValue);
    		},
    		linkTo: function(otherConcept, text){
    			if( this.isLinkedTo(otherConcept)){
    				return null;
    			}
    			var relation = new Relation();
    			relation.text = text;
    			relation.endpointA = this;
    			relation.endpointB = otherConcept;
    			this.relations.push(relation);
    			otherConcept.relations.push(relation);
    			this.fireChanged('relations', relation);
    			return relation;
    		},

    		unlink: function(relation){
    			this.relations.pop(relation);
    			this.fireChanged('relations', null, relation);
    		},

    		isLinkedTo: function(otherConcept){
    			var that = this;
    			var result = _.find(this.relations, function(relation){
    				return relation.isLinked(that);
    			});
    			return (result === undefined || result === null)? false: true;
    		},
		});

		_.extend(Concept, Entity);

		return  Concept; // 클래스를 반환함
	}
);


