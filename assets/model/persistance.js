define(
	['model/ideamap', 'model/Persistance_webstorage'], 
	function(IdeaMap, WebStorage){
		var Persistance = function(){
			var persistance = this;
			this.storage = null;
			if(typeof(Storage)!=="undefined") {
				this.storage = new WebStorage();
			}
			else {

			}

			this.save = function(ideaMap){
				this.clearOld();
				this.saveConcepts();
				this.saveRelations();
			};

			this.load = function(){
				var ideaMap = new IdeaMap();
				this.loadConcepts(ideaMap);
				this.loadConcepts(ideaMap);
				return ideaMap;
			};

			this.clearOld = function() {
				persistance.storage.clear();
			}

			this.saveConcepts = function(){

			};

		};
		return Persistance;
	}
);