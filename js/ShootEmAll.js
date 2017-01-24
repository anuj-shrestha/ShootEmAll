

(function() {
	// constants are defined here
	
	var WIDTH = 900;
	var HEIGHT = 500;

	var keyState;

	var mouse = {
	  x: 0,
	  y: 0
	};

	var enemies = [];
	var bullets = [];

	//main game function
	var ShootEmAll = function() {

		var gameUI = GameUI.getInstance();
		var canvas = gameUI.getCanvas();

		var that = this;
		
		// var mainWrapper = document.getElementsByClassName(
		// 	'main-wrapper');

		// var imageObj = new Image();
  	// imageObj.src = 'images/the-town.png';

  	// get mouse co-ordinates on mouse move
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
			this.player.height = 96;
			this.player.width = 96;
			this.player.playerRotation;

			for (var i = 0; i < 6; i++) {
				
				this.enemy = new Enemy();
				
				this.enemy.x = Utils.getRandom(0, WIDTH);
				this.enemy.y = Utils.getRandom(0 , HEIGHT);
				
				enemies.push(this.enemy);
			}

			var startGameLoop = function() {

				update();
				draw();
				that.checkBulletEnemyCollision();
				that.checkPlayerEnemyCollision();

				window.requestAnimationFrame(startGameLoop, canvas);
			};

			window.requestAnimationFrame(startGameLoop, canvas);
		}

		function update() {

			that.player.update(keyState);

			for (var i = 0; i < enemies.length; i++) {

	      enemies[i].update(that.player.x, that.player.y);

   		}
			
		}

		function draw() {
			
			gameUI.clear(0, 0, WIDTH, HEIGHT);

			var targetX = mouse.x - that.player.x;
		  var targetY = mouse.y - that.player.y;
		  that.player.playerRotation = Math.atan2(targetY, targetX) - Math.PI / 2;
		  that.player.draw(that.player.playerRotation);

		  for (var i = 0; i < enemies.length; i++) {

	      enemies[i].rotation = Math.atan2((that.player.y - enemies[i].y), (that.player.x - enemies[i].x)) - Math.PI / 2;
	      enemies[i].draw(enemies[i].rotation);

   		}
			
			for (var i = 0; i < bullets.length; i++) {

	      bullets[i].draw();
	      bullets[i].update();

   		}

   		// dotted line showing gun direction
			gameUI.drawDottedPath(that.player.x + that.player.width / 2, that.player.y + that.player.height / 2, mouse.x,  mouse.y); // Draw it

		}

		// get Mouse position
		function getMousePos(canvas, evt){

	    var rect = canvas.getBoundingClientRect();
	    var mouseX = evt.clientX - rect.left;
	    var mouseY = evt.clientY - rect.top;

	    return {
	        x: mouseX,
	        y: mouseY
	    };

		}

		// click event listener for shooting bullets
		document.addEventListener('click', function(evt) {

			var bullet = new Bullet();
			bullet.init(that.player.x, that.player.y, 1, mouse.x, mouse.y, that.player.playerRotation);
			bullets.push(bullet);

		});

		// keep track of keypressed 
		keyState = {};

		document.addEventListener('keydown', function(evt) {
			keyState[evt.keyCode] = true;
		});

		document.addEventListener('keyup', function(evt) {
			delete keyState[evt.keyCode];
		});

		// check collision
		that.checkBulletEnemyCollision = function() {

			for (var i = 0; i < enemies.length; i++) {
				var enemyAttacking = enemies[i];
				for (var j = 0; j < bullets.length; j++) {
					var bulletFired = bullets[j];
					

		      if(bulletFired.x < 0 || bulletFired.x > WIDTH || bulletFired.y < 0 || bulletFired
		      	.y > HEIGHT) {
		      	bullets.splice(j, 1);
		      }

		      var collision = Utils.getAABBIntersect(bulletFired.x, bulletFired.y, bulletFired.width, bulletFired.height, enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);
		      if(collision) {
		      	that.deleteBullet(bulletFired, j);
		      	that.killEnemy(enemyAttacking, i);
		      }
		      else {
		      	enemyAttacking.velX = 1;
		      	enemyAttacking.velY = 1;
		      }
	    	}
	    }	
		}
		var tempTimer = 0;
		var tempHealth = 100;
		that.deleteBullet = function(element, index) {
			element.velX -= 1;
			element.velY -= 1;
			element.sY = 120;

			if (tempTimer % 10 === 0){
				element.frame++;
				if (element.frame >= 3){
					element.frame = 0;		
				}
			}

			if(tempTimer > 30 || element.velX <= 0 || element.velY <= 0){
				element = null;
				bullets.splice(index, 1);
				tempTimer = 0;
			}
			else{
				tempTimer++;
			}
		}

		that.killEnemy = function(element, index) {
			element.velX = .8;
			element.velY = .8;
		
			if(element.health < 0){
				element = null;
				enemies.splice(index, 1);
				tempHealth = 100;
			}
			else{
				element.health--;
			}
		}

		that.checkPlayerEnemyCollision = function() {
			
			// var currentPlayer = that.player;
			
			for (var i = 0; i < enemies.length; i++) {
				var enemyAttacking = enemies[i];					
	      var collision = Utils.getAABBIntersect(that.player.x, that.player.y, that.player.width, that.player.height, enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);

	      if(collision) {

	      	enemyAttacking.velX = 0.5;
	      	enemyAttacking.velY = 0.5;
	      	enemyAttacking.sY = 288;
	      }
	      else {
	      	enemyAttacking.velX = 1;
	      	enemyAttacking.velY = 1;
	      }
	    }	

		}


	}

	new ShootEmAll().init();

})();