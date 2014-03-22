define(
	['underscore', 'straps', 'paper', 'view/view'], 
	function(_, Base, paper, View){

		var verticalMargin = 8;
		var horizontalMargin = 10;
		var radius = 10;
		var bgFillColor = "red";
		var borderStrokeColor = "black";
		var borderStrokeWidth = 3;
		var selectedScaleUp = 1.2;

		var ConveptView = Base.extend(View, {
			initialize: function(concept){
				var view = this;
				this.initializeView(concept, "concept");

				this.textComponent = new paper.PointText(concept.asPoint());
				this.textComponent.fillColor = "black";
				this.updateText();

				this.bgComponent = new paper.Shape.Rectangle(new paper.Rectangle(
					concept.asPoint(), 
					this.borderSize()
				), radius);
				this.bgComponent.fillColor = bgFillColor;
				this.updateBg();

				this.borderComponent = new paper.Shape.Rectangle(
					new paper.Rectangle(
						concept.asPoint(), 
						view.borderSize()
					), radius
				);
				this.borderComponent.strokeColor = borderStrokeColor;
				this.borderComponent.strokeWidth = borderStrokeWidth;
				this.updateBorder();

				this.group.addChild(this.bgComponent);
				this.group.addChild(this.textComponent);
				this.group.addChild(this.borderComponent);

				this.group.startDrag = function(){
					view.scaleUpBorder();
				}

				this.group.endDrag = function(){
					view.scaleDownBorder();
				}
			},

			borderSize : function() {
				return new paper.Size(
					this.textComponent.bounds.width 	+ horizontalMargin 	* 2,
					this.textComponent.bounds.height 	+ verticalMargin 	* 2
				);
			},
			
			updateText : function() {
				this.textComponent.content = this.model.text;
				// Concept의 position은 ConceptView의 중심점
				this.textComponent.position = this.model.asPoint();
			},
			
			updateBg : function() {
				this.bgComponent.size = this.borderSize();
				this.bgComponent.radius = radius;
				this.bgComponent.position = this.model.asPoint();
				
			},
			
			updateBorder : function(){
				this.borderComponent.size = this.borderSize();
				this.borderComponent.radius = radius;
				this.borderComponent.position 	= this.model.asPoint();
			},

			update : function() {
				this.updateText();
				this.updateBg();
				this.updateBorder();
			},

			scaleUpBorder : function() {
				this.bgComponent.scale( selectedScaleUp );
				this.borderComponent.scale( selectedScaleUp );
				this.update();
			},
			scaleDownBorder : function(){
				var size = this.borderSize();
				this.borderComponent.bounds = new paper.Rectangle(this.model.asPoint(), size);
				this.bgComponent.bounds = new paper.Rectangle(this.model.asPoint(), size);
				this.update();
			},
		});
		return ConveptView;
	}
);