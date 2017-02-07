//Main Class of Shootemall Game

function ShootEmAllGame() {
	// variables are defined here
	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var keyState;
	var mouseState = 0;
	var LETTER_A = 65;
	var LETTER_D = 68;
	var LETTER_W = 87;
	var LETTER_S = 83;

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

	// mission variables
	var currentPlayerName;
	var currentMissionLvl;
	var survivalTime = 90;
	var survivalTimeLeft = survivalTime;
	var base = null;
	var hostage =  null;
	var hostageTime = 120;
	var resqueZone;

	var enemies = [];
	var maxEnemies = 0;
	var enemyIndex = 0;
	var enemyBoss = undefined;
	var enemyBossCount = 0;
	var enemyLeft = maxEnemies;

	var bullets = [];
	var maxBullets = 100;
	var bulletCount = 100;
	var wallElements = [];
	var gameSound;
	var elements;
	var healthBar;
	var emptyHealthBar;
	var base = null;
	var tree;
	var treesArray = [];
	var treesPosition = [-100, -100, 300, -180, 600, -150, -50, 600, -120, 800, -123, 300, 900, 344, 1222, 903, 1300, 700, 500, 1000, 0, 1100, -700, -300, -123, 1111, -324, 444, -2222, -333, -1111, -400, -412]
	var powerUp = null;
	var powerUpState = false;
	
	var that = this;

	// get mouse co-ordinates on mouse move
	canvas.addEventListener('mousemove', function(evt) {

    var m = getMousePos(canvas, evt);
    mouse.x = m.x;
    mouse.y = m.y;

  }, false);

	this.init = function(playerName, missionLvl) {

		currentPlayerName = playerName;
		currentMissionLvl = missionLvl;

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
			this.player.x = WIDTH / 2 - that.player.height - 100;
			this.player.y = HEIGHT / 2 - that.player.width;

			that.getCurrentPlayerName();
		}

		that.getCurrentMissionLvl();

		if (enemies.length == 0) {

			that.generateEnemies(2);
		}

		that.generateTrees();
		that.bindKeysPressed();
		
		var startGameLoop = function() {
			// this function will be called repeatedly while game is running
			// here game objects are updated and drawn
			gameTime++;

			that.spawnPowerUps();
			that.updateGameObjects();
			that.drawGameObjects();
			that.checkBulletEnemyCollision();
			that.checkPlayerEnemyCollision();
			that.resetEnemyProperties();

			that.generateEnemies(1);
			
			if (!stopped) {
				requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
			}
		};

		requestAnimation = window.requestAnimationFrame(startGameLoop, canvas);
	}

	that.getCurrentPlayerName = function() {
		// set current player attributes
		if (currentPlayerName == 'anuj') {
			this.player.health = 60;
			this.player.initialVelocity = 5;
			this.player.damage = 2.6;
		}

		else if (currentPlayerName == 'shyam') {
			this.player.health = 400;
			this.player.initialVelocity = 1;
			this.player.damage = 1.2;
		}

		else if (currentPlayerName == 'hari') {
			this.player.health = 200;
			this.player.initialVelocity = 3;
			this.player.damage = 1;
		}
	}

	that.getCurrentMissionLvl = function() {
		// initiates elements of current mission
		if (currentMissionLvl == 1) {
			base = new Elements();
			base.getBase();
			base.x = WIDTH / 2 - base.width / 2;
			base.y = HEIGHT / 2 - base.height / 2;
			maxEnemies = 25;
		}
		
		else if (currentMissionLvl == 2) {
			hostage = new Enemy();
			hostage.health = 500;
			hostage.hostage(that.player);
			resqueZone = new Elements();
			resqueZone.resqueZone();
			resqueZone.x = WIDTH / 2 - resqueZone.width;
			resqueZone.y = HEIGHT / 2 - resqueZone.height / 2;
			maxEnemies = 25;
		}
	}

	that.generateTrees = function() {
		for (var i = 0; i < 100; i++) {

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
	}

	that.spawnPowerUps = function() {
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
				bullet.init(that.player.x, that.player.y, gameTime, mouse.x, mouse.y, 
					that.player.playerRotation);
				bullets.push(bullet);
				bulletCount--;
				gameSound.play('machineGun');
			}

			if (mouseState === 0) {
				gameSound.stopMachineGunSound();
			}

			if (bulletCount <= 0){
				powerUpState = false;
			}
		}
	}

	that.updateGameObjects = function() {

		that.player.update(keyState);
		that.walls.playerCollisionWithWallCheck(that.player);

		if (currentMissionLvl == 1) {
			var playerBaseCollision = base.elementCollisionCheck(that.player);

			if (playerBaseCollision) {
				bulletCount++;
			}

			base.update(keyState);
		}

		else if (currentMissionLvl == 2) {
			var playerHostageCollision = Utils.getCollisionDirection(that.player, hostage);

			that.walls.playerCollisionWithWallCheck(hostage);

			if (playerHostageCollision != null) {
				hostage.found = true;
				hostage.velX = 1.5;
				hostage.velY = 1.5;
			}

			hostage.update(that.player, null, hostage, keyState);
			resqueZone.update(keyState);
		}
		
		that.background.update(keyState);
		that.walls.update(keyState);

		if (that.player.health < 200) {
			var healthPercent = (200 - that.player.health) * 100 / 200;
			healthBar.updateHealthUI(healthPercent);
		}

		that.updateBullets();
		that.updateEnemies();

 		if (powerUp != null) {
 			powerUp.update(keyState);
 		}

 		for (var i = 0; i < treesArray.length; i++) {

      treesArray[i].update(keyState);
 		}
	}

	that.drawGameObjects = function() {
		
		gameUI.clear(0, 0, WIDTH, HEIGHT);

		that.background.draw();
		that.walls.draw();
		that.drawMissionElements();
		that.drawPlayer();
		that.drawEnemies();
		that.drawDirectionIndicator();
		
		for (var i = 0; i < bullets.length; i++) {

      bullets[i].draw();
 		}

		// draw trees
 		for (var i = 0; i < treesArray.length; i++) {

      treesArray[i].drawTrees();
 		}

 		// draw powerUps and health bar at the last
 		if (powerUp != null) {
 			powerUp.drawPowerUp(); // draws powerups
 		}

 		that.drawInformationUI();
	}

	that.updateBullets = function() {

		for (var i = 0; i < bullets.length; i++) {

      bullets[i].update();

      var bulletCollided = that.walls.bulletWallCollisionCheck(bullets[i]);

      if (bulletCollided) {
      	that.deleteBullet(bullets[i], i); 
      }

      if (currentMissionLvl == 1 && bullets[i] != undefined && !bullets[i].bulletFromBase) {
	      var collisionWithBaseCase = Utils.getAABBIntersect(bullets[i].x, bullets[i].y, 
	      	bullets[i].width, bullets[i].height, base.x, base.y, base.width, base.height);

	      if (collisionWithBaseCase) {
	      	that.deleteBullet(bullets[i], i); 
	      }
    	}
		}
	}

	that.updateEnemies = function() {
		
		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] == undefined) 
				continue;

			if (currentMissionLvl == 1) {
				enemies[i].update(that.player, base, null, keyState);

				var baseEnemyCollision = base.elementCollisionCheck(enemies[i]);

				if (baseEnemyCollision == 't' || baseEnemyCollision == 'b' || 
					baseEnemyCollision =='l' || baseEnemyCollision == 'r') {
					enemies[i].sY = 288;
					base.health--;
					if (base.health < 0) {
						base = null;
						that.gameOverCase();
					}
				}
			}

			else if (currentMissionLvl == 2) {
      	enemies[i].update(that.player, null, hostage, keyState);
      }

      else {
      	enemies[i].update(that.player, null, null, keyState);
      }

      if (enemyBoss != enemies[i]) {
      	that.walls.wallEnemyCollisionCheck(enemies[i]);
      }

      else {
      	enemies[i].velX = enemies[i].initialVelocity;
      	enemies[i].velY = enemies[i].initialVelocity;	
      }

      if (currentMissionLvl == 2 && hostage.found) {
      	var hostageEnemyCollision = hostage.elementCollisionCheck(enemies[i]);

      	if (hostageEnemyCollision == 't' || hostageEnemyCollision == 'b' || 
      		hostageEnemyCollision =='l' || hostageEnemyCollision == 'r') {
      		enemies[i].sY = 288;
      		hostage.health--;
      		hostage.sY = 290 * 2;
      		
      		if (hostage.health < 0) {
      			hostage = null;
      			that.gameOverCase();
      		}

      		that.killEnemy(enemies[i], enemies[i].index);
      	}
      }
 		}
	}

	that.drawInformationUI = function() {
		
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

		gameUI.writeText('Score: ' + gameScore, 20, WIDTH / 2 - 50, 50);

		switch (currentMissionLvl) {
			case 1:
				that.drawFirstMissionUI();
				break;

			case 2:
				that.drawSecondMissionUI();
				break;
		}
		

		oldHighScore = Math.max(gameScore, oldHighScore)
		gameUI.writeText('High Score: ' + oldHighScore, 20, WIDTH - 150, 50);
	}

	that.drawMissionElements = function() {

		if (currentMissionLvl == 1 && base != null) {
			base.drawBase(); //draws base 
		}

		else if (currentMissionLvl == 2) {
			hostage.drawHostage(hostage.rotation);
			resqueZone.drawPowerUp(); // uses drawPowerUp function to draw resquezone as well;
		}
	}

	that.drawDirectionIndicator = function() {
		// dotted line showing gun direction
		
		if (currentMissionLvl == 2) {
			gameUI.drawDottedPath(that.player.x + that.player.width / 2, 
				that.player.y + that.player.height / 2, hostage.x,  hostage.y);
		}

		else {
			gameUI.drawDottedPath(that.player.x + that.player.width / 2, 
				that.player.y + that.player.height / 2, mouse.x,  mouse.y);
		}
	}

	that.drawPlayer = function() {
		
		if (mouse.x != 0 && mouse.y != 0) {
			targetX = mouse.x - that.player.centerX;
		  targetY = mouse.y - that.player.centerY;
		}
	  that.player.playerRotation = Math.atan2(targetY, targetX) - Math.PI / 2;
	  that.player.draw(that.player.playerRotation, keyState);
	}

	that.drawEnemies = function() {

		var targetEnemyForBase;
		var targetEnemyForHostage;

	  for (var i = 0; i < enemyIndex; i++) {

	  	if (enemies[i] != undefined) {
	      enemies[i].rotation = Math.atan2((that.player.y - enemies[i].y), 
	      	(that.player.x - enemies[i].x)) - Math.PI / 2;
	      enemies[i].draw(enemies[i].rotation, base, hostage);
	    }

	    if (enemies[i] != undefined && currentMissionLvl == 1) {

	    	if (targetEnemyForBase == undefined && enemies[i].baseDistance < 300) {
	    		targetEnemyForBase = enemies[i];
	    	}
	    }

	    else if (enemies[i] != undefined && currentMissionLvl == 2) {

	    	if (targetEnemyForHostage == undefined && enemies[i].hostageDistance < 200) {
	    		targetEnemyForHostage = enemies[i];
	    	}
	    }
 		}
 		that.getTargetForMission(targetEnemyForBase, targetEnemyForHostage);
	}

	that.getTargetForMission = function(targetEnemyForBase, targetEnemyForHostage) {

		if (targetEnemyForBase != undefined && targetEnemyForBase.baseDistance < 300) {
			base.rotation = Math.atan2((base.y + base.height / 2 - targetEnemyForBase.y), 
				(base.x + base.width / 2 - targetEnemyForBase.x)) - Math.PI / 2;
			var bullet = new Bullet();
			bullet.bulletFromBase = true;
			bullet.init(base.x + base.width / 2, base.y + base.height / 2, gameTime, 
				targetEnemyForBase.x + targetEnemyForBase.width / 2, 
				targetEnemyForBase.y + targetEnemyForBase.height / 2, base.rotation);
			bullets.push(bullet);
			gameSound.play('machineGun');
		}

		else if (targetEnemyForHostage != undefined && targetEnemyForHostage.hostageDistance < 200) {
			hostage.rotation = Math.atan2((hostage.y + hostage.height / 2 - targetEnemyForHostage.y), 
				(hostage.x + hostage.width / 2 - targetEnemyForHostage.x)) - Math.PI / 2;
		}
	}

	that.drawFirstMissionUI = function() {

		survivalTimeLeft = survivalTime - Math.floor(gameTime / 60);
		gameUI.writeText('Base Health Left: ' + base.health, 30, WIDTH / 2 - 150, 80);
		gameUI.writeText('Time Left To Win: ' + survivalTimeLeft, 20, WIDTH / 2 - 90, 120);

		if (gameTime < 500) {
			gameUI.writeText('Mission 1: Survive and Protect your tank for ' + survivalTimeLeft, 25, 30 , 300);
		}

		if (survivalTimeLeft <= 0) {
			that.missionCompleteCase();
		}	
	}

	that.drawSecondMissionUI = function() {

		survivalTimeLeft = hostageTime - Math.floor(gameTime / 60);
		gameUI.writeText('Hostage Health Left: ' + hostage.health, 30, WIDTH / 2 - 150, 80);
		gameUI.writeText('Time Left To Lose: ' + survivalTimeLeft, 20, WIDTH / 2 - 90, 120);

		if (gameTime < 500) {
			gameUI.writeText('Mission 2: Find hostage and bring him back to helipad within ' + survivalTimeLeft, 25, 30 , 300);
		}


		if (survivalTimeLeft <= 0) {
			that.gameOverCase();
		}	

		var hostageInRescueZone = Utils.getAABBIntersect(hostage.x, hostage.y, hostage.width, 
			hostage.height, resqueZone.x, resqueZone.y, resqueZone.width, resqueZone.height);

		if (hostageInRescueZone) {
			that.missionCompleteCase();
		}
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

	that.bindKeysPressed = function() {

		// click event listener for shooting bullets
		document.addEventListener('click', function(evt) {

			if (powerUpState == false) {
				var bullet = new Bullet();
				bullet.init(that.player.x, that.player.y, gameTime, mouse.x, mouse.y, 
					that.player.playerRotation);
				bullets.push(bullet);
				gameSound.play('bullet');
			}
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
				bullet.init(that.player.x, that.player.y, gameTime, touches[i].pageX, 
					touches[i].pageY, that.player.playerRotation);
				bullets.push(bullet);
				gameSound.play('bullet');
				targetX = touches[i].pageX - that.player.centerX;
				targetY = touches[i].pageY - that.player.centerY;
		  }

		  for (var i = 0; i < touches.length; i++) {

		    if (touches[i].pageX <= 100) {
		      keyState[LETTER_A] = true; //left arrow
		    }

		    if (touches[i].pageX > 150 && touches[i].pageX < 250) {
		      keyState[LETTER_D] = true; //right arrow
		    }

		    if (touches[i].pageX <= 250 && touches[i].pageY < 250 ) {
		      keyState[LETTER_W] = true; //Up arrow
		    }

		    if (touches[i].pageX <= 250  && touches[i].pageY > 300) {
		      keyState[LETTER_S] = true; //Down arrow
		    }
		  }
		});

		canvas.addEventListener('touchend', function(e) {
			
		  var touches = e.changedTouches;
		  e.preventDefault();

		  for (var i = 0; i < touches.length; i++) {

		    if (touches[i].pageX > 0) {
		      keyState[LETTER_A] = false;
		      keyState[LETTER_D] = false;
		     	keyState[LETTER_W] = false; //Up arrow
		     	keyState[LETTER_S] = false; //Down arrow
		    }
		  }
		});
	}
	

	// check collision
	that.checkBulletEnemyCollision = function() {

		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] != undefined) {
				var enemyAttacking = enemies[i];

				for (var j = 0; j < bullets.length; j++) {

					var bulletFired = bullets[j];

		      if (bulletFired.x < 0 || bulletFired.x > WIDTH || bulletFired.y < 0 ||
		       bulletFired.y > HEIGHT) {
		      	bullets.splice(j, 1);
		      }

		      var collision = Utils.getAABBIntersect(bulletFired.x, bulletFired.y, 
		      	bulletFired.width, bulletFired.height, 
		      	enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);

		      if (collision) {
		      	that.deleteBullet(bulletFired, j);
		      	that.killEnemy(enemyAttacking, enemyAttacking.index);
		      	enemyAttacking.velX = -0.5;
		      	enemyAttacking.velY = -0.5;
		      }
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
			// gameSound.play('bulletHit');
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
			

			if (enemyBossCount > 0 && element == enemyBoss) {
				enemyBoss = undefined;
			}
			element = null;
			delete enemies[index];
			gameSound.play('killEnemy');
			gameScore++;
		}

		else{
			element.health -= that.player.damage;
		}
	}

	that.checkPlayerEnemyCollision = function() {
		
		// var currentPlayer = that.player;
		
		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] != undefined) {
				var enemyAttacking = enemies[i];					
	      var collision = Utils.getAABBIntersect(that.player.x, that.player.y, 
	      	that.player.width, that.player.height,
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
	}

	that.resetEnemyProperties = function() {

		for (var i = 0; i < enemyIndex; i++) {

			if (enemies[i] != undefined) {

				var enemyAttacking = enemies[i];					
		    var collision = Utils.getAABBIntersect(that.player.x, that.player.y, 
		    	that.player.width, that.player.height,
		    	enemyAttacking.x, enemyAttacking.y, enemyAttacking.width, enemyAttacking.height);
	  	}
	  }
	}

	that.checkPlayerPowerUpCollision = function() {

		var collision = Utils.getAABBIntersect(that.player.x, that.player.y, 
			that.player.width, that.player.height,
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

	that.generateEnemies = function(firstTime) {

		var temp = 0;
		var enemiesKilled = 0;
		
		if (enemyLeft < 2){
			maxEnemies += 20;


			for (var i = 0; i < maxEnemies; i++) {

				this.enemy = new Enemy();
				this.enemy.initialVelocity = maxEnemies * 0.02 * firstTime;
				this.enemy.width = Utils.getRandom(80, 96);
				this.enemy.height = this.enemy.width; 
		
				if (enemyBoss == undefined){
					enemyBossCount++;
					enemyBoss = this.enemy;
					this.enemy.initialVelocity = maxEnemies * 0.05;
					this.enemy.health = 2000 * enemyBossCount;
					this.enemy.boss = true;
					this.enemy.width = 96 + enemyBossCount * 48;
					this.enemy.height = this.enemy.width;
				}
				
				this.enemy.x = Utils.getRandom(-2000, 4000);
				this.enemy.y = Utils.getRandom(-1000, 2000);

				if (Math.abs(this.enemy.x - this.player.x) < 500 && Math.abs(this.enemy.y - this.player.y) < 500) {
					this.enemy.x += 1000;
					this.enemy.y += 1000;
				}
				
				this.enemy.index = enemyIndex;
				enemies[enemyIndex] = this.enemy;
				enemyIndex++;
			}
		}

		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i] == undefined) {
				temp++;
			}
		}
		enemyLeft = enemies.length - temp;
		console.log('enemyLeft', enemyLeft);
	}

	that.missionCompleteCase = function() {

		gameSound.play('powerUpSound');
		window.cancelAnimationFrame(requestAnimation);
		stopped = true;
		gameSound.stopGameSong();
		localStorage.setItem('shootEmAllHighScore', oldHighScore);
		gameUI.writeText('Mission Complete !!!', 120, WIDTH/2 - 420, HEIGHT / 2, 'orange');
		gameUI.writeText('Press Space To Play Next Mission', 60, WIDTH/2 - 420, HEIGHT - 180, 'orange');
		currentMissionLvl = 2;
		that.restartGame();
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
		that.restartGame();	
	}

	that.restartGame = function() {

		document.addEventListener('keypress', function(evt) {

			if (evt.code == "Space" && stopped == true) { 
				stopped = false;
				that.player = null;
				
				bullets = [];
				maxBullets = 100;

				enemies.length = 0;
				enemies = [];
				enemyIndex = 0;
				maxEnemies = 20;
				enemyBoss = undefined;
				enemyBossCount = 0;

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

				that.init(currentPlayerName, currentMissionLvl);
			}
		});
	}
}