/*
	화면상에서 발생하는 이벤트들에 대한 mediator 역활을 수행

*/
define(
	['underscore', 'straps', 'paper', 
		'controller/waitInput',
	], 
	function(_, Base, paper,
		WaitState
	){
		var Events = Base.extend({
			initialize: function() {
				var events = this;
				this.nextState('wait');

				paper.tool.onMouseDown  = function(event) { 
					events.state.onMouseDown(event, events.hitResult(event)); 
				};

				paper.tool.onMouseDrag  = function(event) { 
					events.state.onMouseDrag(event); 
				};

				paper.tool.onMouseUp  = function(event) { 
					events.state.onMouseUp(event); 
				};
			},
			hitTest: function(event){
				return paper.project.hitTest(event.downPoint,{type:"group", fill:true});
			},

			nextState: function(nextStateName, arg1, arg2, arg3){
				if (this.state !== undefined){
					this.state.exit();
				}
				switch(nextStateName){
					case 'wait': 
						this.state = new WaitState(this); 
						break;
					case 'conceptSelected': 
						this.state = new ConceptSelectedState(this); 
						break;
				}
				if (this.state.enter !== undefined) {
					this.state.enter(arg1,arg2,arg3);	
				}
			},

		});
		return Events;
	}
);