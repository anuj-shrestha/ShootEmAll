

(function() {
	// constants are defined here
	
	var WIDTH = 900;
	var HEIGHT = 500;

	var keyState;

	var mouse = {
	  x: 0,
	  y: 0
	};

	var bullets = [];

	function getRandom(min, max) {

    return Math.floor(Math.random()*(max-min+1)+min);
  }

	//main game function
	var ShootEmAll = function() {

		var gameUI = GameUI.getInstance();
		var canvas = gameUI.getCanvas();
		
		// var mainWrapper = document.getElementsByClassName(
		// 	'main-wrapper');

		var that = this;

		var imageObj = new Image();
    imageObj.src = './images/the-town.png';

		canvas.addEventListener('mousemove', function(evt) {

      var m = getMousePos(canvas, evt);
      mouse.x = m.x;
      mouse.y = m.y;

	  }, false);

		this.init = function() {

			gameUI.setWidth(WIDTH);
			gameUI.setHeight(HEIGHT);

			this.player = new Player();
			this.player.x = 0;
			this.player.y = 0;
			this.player.height = 48;
			this.player.width = 48;

			this.enemy = new Enemy();
			this.enemy.x = 200;
			this.enemy.y = 200;
			// this.enemy.x = getRandom(0, WIDTH);
			// this.enemy.y = getRandom(0 , HEIGHT);
			// console.log('enemy', this.enemy.x);

			var loop = function() {

				update();
				draw();
				window.requestAnimationFrame(loop, canvas);
			};

			window.requestAnimationFrame(loop, canvas);
		}

		function update() {

			that.player.update(keyState);
			that.enemy.update(that.player.x, that.player.y);
		}

		function draw() {
			
			gameUI.clear(0, 0, WIDTH, HEIGHT);

			var targetX = mouse.x - that.player.x;
		  var targetY = mouse.y - that.player.y;
		  var playerRotation = Math.atan2(targetY, targetX) - Math.PI / 2;
		  var enemyRotation = Math.atan2((that.player.y - that.enemy.y), (that.player.x - that.enemy.x)) - Math.PI / 2;

			// ctx.fillText("mouse x: " + mouse.x + " ~ mouse y:" + mouse.y + " ~ rotation: " + rotation, 30, 30);

			that.player.draw(playerRotation);
			that.enemy.draw(enemyRotation);

			for (var i = 0; i < bullets.length; i++) {
	      bullets[i].draw(playerRotation);
	      bullets[i].update(mouse.x, mouse.y);
   		}
			// ctx.clearRect(0,0,WIDTH,HEIGHT);

			gameUI.drawDottedPath(that.player.gunPointX, that.player.gunPointY, mouse.x,  mouse.y); // Draw it

		}

		function getMousePos(canvas, evt){

	    var rect = canvas.getBoundingClientRect();
	    var mouseX = evt.clientX - rect.left;
	    var mouseY = evt.clientY - rect.top;

	    return {
	        x: mouseX,
	        y: mouseY
	    };
		}

		document.addEventListener('click', function(evt){
			var bullet = new Bullet();
			bullet.init(that.player.x, that.player.y, 1);
			bullets.push(bullet);

		});

			// keep track of keypressed 
		keyState = {};
		document.addEventListener('keydown', function(evt){
			keyState[evt.keyCode] = true;
		});

		document.addEventListener('keyup', function(evt){
			delete keyState[evt.keyCode];
		});

	}

	new ShootEmAll().init();

})();