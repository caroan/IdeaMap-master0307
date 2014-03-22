/**
아무것도 선택되지 않은 상태를 위한 FSM
*/
define(
	['underscore', 'straps', 'paper'], 
	function(_, Base, paper){
		var WaitState = Base.extend({
			initialize: function(Events){
				this.events = events;	
			},
			onMouseDown: function(event, hitResult){
				// 클릭 가능한 것은 item이며 이 아이템들을 묶은 group을 다루고자 하기 때문에 parent를 찾는다. 
				var g = hitResult.item.parent;
				switch(g.viewType){
					case 'concept': 
						events.nextState('conceptSelected', g);
						break;
				}
			}

			},
			onMouseUp: function(event){

			},
			onMouseDrag: function(event){

			},
		});
		return WaitState;
	}
);