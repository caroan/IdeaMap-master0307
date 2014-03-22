define(
	['model/concept', 'paper'], 
	function(Concept, paper){

		test('컨셉의 초기값 확인', function(){
			var c = new Concept();
			equal(0, c.x, "initial x position = 0");
			equal(0, c.y, "initial y position = 0");
			equal("", c.text, "initial text is empty");
		});

		test('change property',  function(){
			var c = new Concept();
			equal(0, c.x, "initial x position = 0");
			c.x = 10;
			
			equal(10, c.x, "changed x position = 10");		
		});	

		test('listen changed event',  function() {
			var c = new Concept();
			equal(0, c.x, "initial x position = 0");

			var changed = false;
			c.listen(function(source, propertyName, newValue, oldValue ){
				ok(c === source, "event must occured in we listened ");
				equal('x', propertyName, 'fired change event source is position');
				equal(10, newValue, 'new value = 10');
				equal(0, oldValue, 'old value = 0');
				changed = true;
			});
			c.x = 10;
			equal(10, c.x, "changed x position = 10");
			equal(true, changed, "event listened");
		});

		test('Entity에서 상속받은 listeners 속성이 인스턴스에서 공유되지 않음', function(){
			// Note: 
			// straps Base.extend 에 의해 상속 객체를 만들면 property를 복사하게 된다. 
			// 값 복사는 상관없지만 배열등 객체 복사는 상속객체간에 공유객체를 만들게 된다. 
			// 이를 해결하기 위해 lazy initialize를 이용해 객체 공유를 제거한다. 
			// 사실 straps에서 복수의 initilize를 지원하면 되는 문제인데 straps에서는 Base.extends(...)에 넘긴 복수의 객체중
			// initilize를 가진 첫번째 객체의 initialize만을 생성자로 사용하는게 문제. 

			var c1 = new Concept();
			ok(c1.listeners === null);
			c1.listen(function(){});
			ok(c1.listeners !== null);

			var c2 = new Concept();
			ok(c2.listeners === null);
			c2.listen(function(){});
			ok(c2.listeners !== null);

			ok (c1.listeners !== c2.listeners, "서로 다른 인스턴스간에 listeners를 공유하지 않아야 한다. ");
		});

		test('위치 이동', function(){
			var c = new Concept();
			var changed = false;
			c.listen(function(source, propertyName, newValue, oldValue){
				if ("position" !== propertyName){
					return;
				}
				changed = true;
			});
			c.moveTo(1,3);
			equal(1, c.x);
			equal(3, c.y);

			ok( changed === true);

		});

		test('Event callback owership problem 1 - fail case', function(){
			// Note: http://okjungsoo.tistory.com/entry/Functionapply
			// 
			var obj = {
				value: 0,
				func: function() {
					this.value++;
				}
			};
			
			var c = new Concept();

			c.listen(obj.func);
			equal(0, obj.value);

			c.x = 5;
			equal(0, obj.value, "callback 함수의 owner 객체를 주지 않았기 때문에 obj의 값이 변하지 않는다");			
		});

		test('Event callback owership problem 1', function(){
			var obj = {
				value: 0,
				func: function() {
					this.value++;
				}
			};
			
			var c = new Concept();

			// 함수 호출시 apply등을 이용해 ownership을 지정하지 않으면 객체의 속성인 함수가 정상적으로 호출되지 않을수 있다. 
			c.listen(obj.func, obj);
			equal(0, obj.value);

			c.x = 5;
			equal(1, obj.value);			
		});

		

		test('Event callback owership problem 2', function(){
			var obj = {
				value: 0,
				func: function() {
					this.value++;
				}
			};
			
			var c = new Concept();

			// ownership을 넘기지 않는다면 객체에 메시지를 보내는 adapter 함수를 등록해 사용할수도 있다. 
			c.listen(function(){
				obj.func();
			});
			equal(0, obj.value);

			c.x = 5;
			equal(1, obj.value, "아답터 함수를 통해 객체 호출을 했기 때문에 객체의 값이 변해야 한다.");			
		});
	}
);
