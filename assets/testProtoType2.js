/*

	개인적으로 연습하는 공간

*/

require(
	['paper', 'model/concept', 'view/conceptView', 'view/relationView']
	function(){
		var tCanvas = document.getElementById('myCanvas');
		paper.setUp(tCanvas);

		var tLayer = paper.Layer();
		tLayer.activate();


		var selectedGroup = null;
		var tConcept01 = new Concept();

		paper.tool.onMouseDown = function(){
			var hitResult = paper.project.hitTest(event.downPoint,{type:"group", fill:true});
			if(hitResult == null){
				if(selectedGroup == null){
					return;
				}
				// 빈 공간을 클릭 한 것이기 때문에 선택 해제

				tConcept01.x = event.downPoint.x;
				tConcept01.y = event.downPoint.y;
				tConcept01.text = "new Item"

				selectedGroup.endDrag();
				selectedGroup = null;
				return;
			}

			var g = hitResult.item.parent;
			if(g == selectedGroup){
				return;
			}
			if(g != selectedGroup){
				selectedGroup.endDrag();
			}

			selectedGroup = g;
			selectedGroup.startDrag();
		}

		paper.tool.onMouseUp = function (event) {
			selectedGroup.endDrag();
		}

		paper.tool.onMouseDrag = function (event) {
			if (selectedGroup == null){
				return;
			}
			
			selectedGroup.viewComponent.model.moveTo(event.delta.x, event.delta.y);

		}
	}
);