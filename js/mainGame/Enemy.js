function Enemy() {

	var gameUI = GameUI.getInstance();
	var ctx = gameUI.getContext();

	var zombieCounter = 0;
	var maxZombie = 10;

	var element = new Image();
	element.src = "images/player-enemy-sprites.png";

	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	this.x;
	this.y;
	this.initialVelocity = 1.5;
	this.velX = this.initialVelocity;
	this.velY = this.initialVelocity;
	this.destinationX;
	this.destinationY;
	
	this.type;
	this.state;
	this.boss = false;
	this.index;
	this.health = 100;
	this.time = 0;
	this.collisionFlag = false;

	this.sX = 0;
	this.sY = 144;
	this.sWidth = 48;
	this.width = 96;
	this.height = 96;

	this.frame = 0;
	this.rotation;

	var that = this;

	this.draw = function(rotation) {

		if (that.time % 8 === 0 || that.time % 8 === 0){
			that.frame++;

			if (that.frame >= 4){
				that.frame = 0;

				if(that.sY === 144){
					that.sY = 144 + 48;
				}

				else {
					that.sY = 144;
				}
			}
		}

		that.sX = that.sWidth * that.frame;

		ctx.save();
		ctx.translate(that.x + that.width/2, that.y + that.height/2);
		ctx.rotate(rotation);
		ctx.drawImage(element, that.sX, that.sY, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);

		if (that.health < 90 && that.health > 70){
			ctx.drawImage(element, 0, 384, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 70 && that.health > 50){
			ctx.drawImage(element, 48, 384, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 50 && that.health > 25){
			ctx.drawImage(element, 96, 384, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 25){
			ctx.drawImage(element, 142, 384, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}
		
		if (that.sX === 96 && that.sY === 288 && that.time % 5 === 0){
			ctx.drawImage(element, that.sX, that.sY + 48, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2, that.width, that.height);
		}
		ctx.restore();		

	}
	
	this.update = function(playerX, playerY, bgX, bgY, keyState) {

		that.time++;

		that.destinationX = playerX - that.x + 0.1;
		that.destinationY = playerY - that.y + 0.1;
		
		var max = Math.max(Math.abs(that.destinationX), Math.abs(that.destinationY));
		var xIncrement = that.destinationX / max;
		var yIncrement = that.destinationY / max;

		that.x += xIncrement * that.velX;
		that.y += yIncrement * that.velY;

		if (keyState[letterA]){

	      that.x += 3;

	    }
	    else if (keyState[letterD]){

	      that.x -= 3;

	    }
	    else if (keyState[letterW]){
	      
	      that.y += 3;

	    }
	    else if (keyState[letterS]){

	      that.y -= 3;

	    }
	    else{

	    }

		// that.x = Math.max(Math.min(that.x, gameUI.getWidth() - that.width), 0);
		// that.y = Math.max(Math.min(that.y, gameUI.getHeight() - that.height), 0);
	}
}