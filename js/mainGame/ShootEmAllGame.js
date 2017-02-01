

function ShootEmAllGame() {
	// constants are defined here
	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var keyState;
	var mouseState = 0;
	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	var mouse = {
	  x: 0,
	  y: 0
	};
	var targetX;
	var targetY;

	var requestAnimation;
	var gameTime = 0;
	var stopped = false;
	var collision = 0;
	var gameScore = 0;
	var oldHighScore = localStorage.getItem('shootEmAllHighScore');


	var enemies = [];
	var maxEnemies = 20;
	var enemyIndex = 0;
	var bullets = [];
	var maxBullets = 100;
	var bulletCount = 100;
	var wallElements = [];
	var gameSound;
	var elements;
	var healthBar;
	var emptyHealthBar;
	var tree;
	var treesArray = [];
	var treesPosition = [-100, -100, 300, -180, 600, -150, -50, 600, 120, 800, -123, 300, 900, 344, 1222, 903, 1300, 700, 500, 1000, 0, 1100, -700, -300, -123, 1111, -324, 444, -2222, -333, -1111, -400, -412]
	var powerUp = null;
	var powerUpState = false;
	
	var that = this;

	// get mouse co-ordinates on mouse move
	canvas.addEventListener('mousemove', function(evt) {

    var m = getMousePos(canvas, evt);
    mouse.x = m.x;
    mouse.y = m.y;

  }, false);

	this.init = function() {

		gameUI.setWidth(WIDTH);
		gameUI.setHeight(HEIGHT);
		gameUI.show();

		if (!gameSound) {
			gameSound = new GameSound();
			gameSound.init();
			gameSound.play('gameSong');
		}
		
		this.background = new Background();
		this.background.x = -this.background.centerX / 2;
		this.background.y = -this.background.centerY / 2;

		this.walls = new Walls();

		emptyHealthBar = new Elements();
		emptyHealthBar.emptyHealthUI();

		healthBar = new Elements();
		healthBar.healthUI();

		if (!this.player) {
			this.player = new Player();
			this.player.height = 72;
			this.player.width = 72;
			this.player.x = WIDTH / 2 - that.player.height;
			this.player.y = HEIGHT / 2 - that.player.width;
		}

		if (enemies.length == 0) {

			for (var i = 0; i < maxEnemies; i++) {
				
				this.enemy = new Enemy();
				this.enemy.x = Utils.getRandom(-2000, 4000);
				this.enemy.y = Utils.getRandom(-1000 , 2000);
				if (Math.abs(this.enemy.x - this.player.x) < 500 && Math.abs(this.enemy.y - this.player.y) < 500) {
					this.enemy.x += 1000;
					this.enemy.y += 1000;
				}
				// this.enemy.index = enemyIndex;
				enemies.push(this.enemy);
				enemyIndex++;
			}
		}

		if (gameTime > 100) {
			powerUp = new Elements();
			powerUp.gunPowerUp();
		}

		for (var i = 0; i < 100; i++){

			tree = new Elements();

			if (i % 2 == 0) {
			tree.tree1(); // sets properties of tree type 1
			}

			else {
				tree.tree2();
			}
			if (treesPosition[i] != undefined){
				tree.x = treesPosition[i];
				tree.y = treesPosition[i + 1];
			}
			
			treesArray.push(tree);
		}
		
	

		var startGameLoop = function() {

			gameTime++;

			if ((gameTime % 100 === 0 && gameTime < 101) || gameTime % 1000 === 0) {
				powerUp = new Elements();
				powerUp.gunPowerUp();
			}

			if (gameTime % 1700 === 0) {
				powerUp = new Elements();
				powerUp.healthPowerUp();
			}

			if (powerUp != null) {				
				that.checkPlayerPowerUpCollision();
			}	

			if (powerUpState) {

				if (mouseState === 1 && bulletCount > 0) {
					var tempTime = gameTime;
					var bullet = new Bullet();
					bullet.init(that.player.x, that.player.y, gameTime, mouse.x, mouse.y, that.player.playerRotation);
					bullets.push(bullet);
					bulletCount--;
					gameSound.play('machineGun');
				}

				if (mouseState === 0) {
					gameSound.stopMachineGunSound();
				}
			}

			update();
			draw();
			that.checkBulletEnemyCollision();
			that.checkPlayerEnemyCollision();
			that.resetEnemyProperties();

			if (enemies.length < 5) {
				that.generateEnemies();
			}

			if (!stopped) {
				requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
			}
		};

		requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
	}

	function update() {

		that.player.update(keyState);
		that.walls.playerCollisionWithWallCheck(that.player);
		that.background.update(keyState);
		that.walls.update(keyState);

		if (that.player.health < 200) {
			var healthPercent = (200 - that.player.health) * 100 / 200;
			healthBar.updateHealthUI(healthPercent);
		}

		for (var i = 0; i < bullets.length; i++) {

      bullets[i].update();

      var indexCollided = that.walls.bulletWallCollisionCheck(bullets[i]);

      if (indexCollided) {
      	that.deleteBullet(bullets[i], i); 
      }
 		}
 		
		for (var i = 0; i < enemies.length; i++) {

      enemies[i].update(that.player.x, that.player.y, that.background.xIncrement, that.background.yIncrement, keyState);
      that.walls.wallEnemyCollisionCheck(enemies[i]);
 		}

 		if (powerUp != null) {
 			powerUp.update(keyState);
 		}

 		for (var i = 0; i < treesArray.length; i++) {

      treesArray[i].update(keyState);
 		}
	}

	function draw() {
		
		gameUI.clear(0, 0, WIDTH, HEIGHT);

		that.background.draw();
		that.walls.draw();
		if (mouse.x != 0 && mouse.y != 0) {
			targetX = mouse.x - that.player.centerX;
		  targetY = mouse.y - that.player.centerY;
		}
	  that.player.playerRotation = Math.atan2(targetY, targetX) - Math.PI / 2;
	  that.player.draw(that.player.playerRotation);

	  for (var i = 0; i < enemies.length; i++) {

      enemies[i].rotation = Math.atan2((that.player.y - enemies[i].y), (that.player.x - enemies[i].x)) - Math.PI / 2;
      enemies[i].draw(enemies[i].rotation);
 		}
		
		for (var i = 0; i < bullets.length; i++) {

      bullets[i].draw();
 		}

 		// dotted line showing gun direction
		gameUI.drawDottedPath(that.player.x + that.player.width / 2, that.player.y + that.player.height / 2, mouse.x,  mouse.y); // Draw it

		// draw trees
 		for (var i = 0; i < treesArray.length; i++) {

      treesArray[i].drawTrees();
 		}

 		// draw powerUps and health bar at the last
 		if (powerUp != null) {
 			powerUp.drawPowerUp(); // draws powerups
 		}

 		emptyHealthBar.drawHealthUI();
 		healthBar.drawHealthUI();

 		gameUI.writeText('Health: '+ that.player.health, 20, 4, 120);

 		if (powerUpState == false || bulletCount <= 0) {
 			gameUI.writeText('Gun: Pistol', 20, 120, 30);
 			gameUI.writeText('Bullets: Infinite', 20, 110, 60);
 		}

 		else if (powerUpState == true) {
 			gameUI.writeText('Gun: Machine Gun', 20, 110, 30);
 			gameUI.writeText('Bullets: '+ bulletCount, 20, 110, 60);
 		}

 		gameUI.writeText('Score: '+ gameScore, 20, WIDTH / 2 - 50, 50);
 		oldHighScore = Math.max(gameScore, oldHighScore)
 		gameUI.writeText('High Score: '+ oldHighScore, 20, WIDTH - 150, 50);

	}

	// get Mouse position
	function getMousePos(canvas, evt) {

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
		bullet.init(that.player.x, that.player.y, gameTime, mouse.x, mouse.y, that.player.playerRotation);
		bullets.push(bullet);
		gameSound.play('bullet');
	});

	document.addEventListener('mousedown', function(evt) {

		mouseState = 1;
	});

	document.addEventListener('mouseup', function(evt) {

		mouseState = 0;
	});

	// keep track of keypressed 
	keyState = {};

	document.addEventListener('keydown', function(evt) {

		keyState[evt.keyCode] = true;
	});

	document.addEventListener('keyup', function(evt) {

		delete keyState[evt.keyCode];
	});

	//key binding for touch events
	canvas.addEventListener('touchstart', function(e) {

	  var touches = e.changedTouches;
	  e.preventDefault();

	  for (var i = 0; i < touches.length; i++) {

	   	var bullet = new Bullet();
			bullet.init(that.player.x, that.player.y, gameTime, touches[i].pageX, touches[i].pageY, that.player.playerRotation);
			bullets.push(bullet);
			gameSound.play('bullet');
			targetX = touches[i].pageX - that.player.centerX;
			targetY = touches[i].pageY - that.player.centerY;
	  }

	  for (var i = 0; i < touches.length; i++) {

	    if (touches[i].pageX <= 100) {
	      keyState[letterA] = true; //left arrow
	    }

	    if (touches[i].pageX > 150 && touches[i].pageX < 250) {
	      keyState[letterD] = true; //right arrow
	    }

	    if (touches[i].pageX <= 250 && touches[i].pageY < 250 ) {
	      keyState[letterW] = true; //Up arrow
	    }

	    if (touches[i].pageX <= 250  && touches[i].pageY > 300) {
	      keyState[letterS] = true; //Down arrow
	    }
	  }
	});

	canvas.addEventListener('touchend', function(e) {
	  var touches = e.changedTouches;
	  e.preventDefault();

	  for (var i = 0; i < touches.length; i++) {
	    if (touches[i].pageX > 0) {
	      keyState[letterA] = false;
	      keyState[letterD] = false;
	     	keyState[letterW] = false; //Up arrow
	     	keyState[letterS] = false; //Down arrow
	    }
	  }
	});

	// check collision
	that.checkBulletEnemyCollision = function() {

		for (var i = 0; i < enemies.length; i++) {

			var enemyAttacking = enemies[i];
			for (var j = 0; j < bullets.length; j++) {

				var bulletFired = bullets[j];

	      if (bulletFired.x < 0 || bulletFired.x > WIDTH || bulletFired.y < 0 ||
	       bulletFired.y > HEIGHT) {
	      	bullets.splice(j, 1);
	      }

	      var collision = Utils.getAABBIntersect(bulletFired.x, bulletFired.y, bulletFired.width, bulletFired.height, 
	      	enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);

	      if (collision) {
	      	that.deleteBullet(bulletFired, j);
	      	that.killEnemy(enemyAttacking, i);
	      	enemyAttacking.velX = -0.5;
	      	enemyAttacking.velY = -0.5;

	      }
    	}
    }	
	}

	var tempTimer = 0;

	that.deleteBullet = function(element, index) {

		element.velX -= 1;
		element.velY -= 1;
		element.sY = 120;

		if (tempTimer % 5 === 0) {
			gameSound.play('bulletHit');
			element.frame++;

			if (element.frame >= 3) {
				element.frame = 0;		
			}
		}

		if (tempTimer > 20 || element.velX <= 0 || element.velY <= 0) {
			bullets.splice(index, 1);
			tempTimer = 0;
		}

		else {
			tempTimer++;
		}
	}

	that.killEnemy = function(element, index) {

		if (element.health < 0){
			element = null;
			enemies.splice(index, 1);
			console.log('enemy spliced', index);
			gameSound.play('killEnemy');
			gameScore++;	
		}
		else{
			element.health--;

		}
	}

	that.checkPlayerEnemyCollision = function() {
		
		// var currentPlayer = that.player;
		
		for (var i = 0; i < enemies.length; i++) {

			var enemyAttacking = enemies[i];					
      var collision = Utils.getAABBIntersect(that.player.x, that.player.y, that.player.width, that.player.height,
       enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);
      var tempVel = enemyAttacking.velX;
      collisionTime = 0;
      var initialVelocity = enemyAttacking.velX;

      if (collision) {
      	collisionTime++;

      	if (collisionTime < 5 || collisionTime % 20) {
      		gameSound.play('playerPain');
      	}

      	enemyAttacking.velX = 0.5;
      	enemyAttacking.velY = 0.5;
      	enemyAttacking.sY = 288; //attacking sprites
      	that.player.health--;
				
      	if (that.player.health <= 0) {
      		that.gameOverCase();
      	}
      }
    }	
	}

	that.resetEnemyProperties = function() {

		for (var i = 0; i < enemies.length; i++) {

			var enemyAttacking = enemies[i];					
	    var collision = Utils.getAABBIntersect(that.player.x, that.player.y, that.player.width, that.player.height,
	    	enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);
	  }
	}

	that.checkPlayerPowerUpCollision = function() {

		var collision = Utils.getAABBIntersect(that.player.x, that.player.y, that.player.width, that.player.height,
			powerUp.x, powerUp.y, powerUp.width, powerUp.height);
					
		if (collision && powerUp.type == 18) { // type 18 is gunpowerup
			maxBullets += 100;
			powerUpState = true;
			powerUp = null;
			bulletCount += maxBullets;
			gameSound.play('powerUpSound');				
		}

		else if (collision && powerUp.type == 19) { // type 19 is healthpowerup
			that.player.health += 100;
			var healthPercent = (200 - that.player.health) * 100 / 200;
			healthBar.updateHealthUI(healthPercent);
			powerUp = null;
			gameSound.play('powerUpSound');								
		}
	}

	that.generateEnemies = function() {
		maxEnemies += 20;
		for (var i = enemies.length; i < maxEnemies; i++) {
			
			this.enemy = new Enemy();
			this.enemy.initialVelocity = maxEnemies * 0.02;
			this.enemy.x = Utils.getRandom(-2000, 4000);
			this.enemy.y = Utils.getRandom(-1000, 2000);
			if (Math.abs(this.enemy.x - this.player.x) < 500 && Math.abs(this.enemy.y - this.player.y) < 500) {
				this.enemy.x += 1000;
				this.enemy.y += 1000;
			}
			// this.enemy.index = enemyIndex;
			enemies.push(this.enemy);
		}
	}

	that.gameOverCase = function() {

		console.log('gameOverCase', requestAnimation);
		gameSound.play('playerDie');	

		window.cancelAnimationFrame(requestAnimation);
		stopped = true;
		gameSound.stopGameSong();
		localStorage.setItem('shootEmAllHighScore', oldHighScore);
		gameUI.writeText('Game Over !!!', 120, WIDTH/2 - 280, HEIGHT / 2, 'orange');
  	gameUI.writeText('Press Space To Play Again', 60, WIDTH/2 - 300, HEIGHT - 100, 'orange');
		// that.player = null;
			
		document.addEventListener('keypress', function(evt) {

			if (evt.code == "Space" && stopped == true) { 
				stopped = false;
				that.player = null;
				
				bullets = [];
				maxBullets = 100;

				enemies.length = 0;
				ememies = [];
				enemyIndex = 0;
				maxEnemies = 20;

				gameTime = 0;
				collision = 0;
				gameScore = 0;

				bulletCount = 100;
				wallElements = [];
				gameSound = null;
				elements = null;
				tree = null;
				treesArray = [];
				powerUp = null;
				powerUpState = false;

				that.init();
			}
		});
	}
}