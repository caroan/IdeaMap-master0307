define(
	['underscore', 'straps', 'paper', 'view/view'], 
	function(_, Base, paper, View){
		var lineStrokeColor = 'green';
		var lineStrokeWidth = 3;
		var textColor 		= "#000000";

		var RelationView = Base.extend(View, {
			initialize: function(relation) {
				var view = this;
				this.initializeView(relation, "relation");
				
				this.lineComponent = new paper.Path.Line(relation.endpointA.asPoint(),relation.endpointB.asPoint() );
				this.lineComponent.strokeColor = lineStrokeColor;
				this.lineComponent.strokeWidth = lineStrokeWidth;

				this.textComponent = new paper.PointText(relation.asPoint());
				this.textComponent.fillColor = textColor;
				this.textComponent.content = this.model.text;
				this.updateText();

				this.group.addChild(this.lineComponent);
				this.group.addChild(this.textComponent);
			},
			updateLine: function(){
				this.lineComponent.firstSegment.point 	= this.model.endpointA.asPoint();
				this.lineComponent.lastSegment.point 	= this.model.endpointB.asPoint();
			},
			updateText: function() {
				this.textComponent.content	= this.model.text;
				this.textComponent.position = this.model.asPoint();
			},
			update: function(){
				this.updateLine();
				this.updateText();
			},

		});
		return RelationView;
	}
);