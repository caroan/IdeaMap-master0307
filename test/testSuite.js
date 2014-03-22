QUnit.config.autostart = false;

require(
	[
		'unit/conceptTest.js', 
		'unit/ideaMapTest.js',
		'unit/relationTest.js',
		
	], 
	function(){
		QUnit.start(); //Tests loaded, run tests
	}
);