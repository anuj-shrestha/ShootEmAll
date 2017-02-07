function Player() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var LETTER_A = 65;
	var LETTER_D = 68;
	var LETTER_W = 87;
	var LETTER_S = 83;

	var element = new Image();
	element.src = "images/player-enemy-sprites.png";

	this.x;
	this.y;
	this.velX = 1;
	this.velY = 1;

	this.centerX = this.x + this.width / 2;
	this.centerY = this.y + this.height / 2;
	this.playerRotation;
	
	this.name;
	this.state;
	this.health = 200;
	this.damage = 1;
	this.initialVelocity = 3;

	this.sX = 7;
	this.sY = 4;
	this.width = 48;
	this.height = 48;
	this.sWidth = 34;
	this.sHeight = 40;

	this.frame = 0;

	var that = this;

	this.setPosition = function(x, y) {
		that.x = x;
		that.y = y;
	}

	this.keyPressed = function(keyState) {
	
    if (keyState.hasOwnProperty(LETTER_W) || keyState.hasOwnProperty(LETTER_S) || 
    	keyState.hasOwnProperty(LETTER_A) || keyState.hasOwnProperty(LETTER_D)) {
    	return true;
    }
     
    return false;
	}

	this.setDimension = function(width, height) {
		that.width = width;
		that.height = height;
	}

	this.draw = function(rotation, keyState) {
		var bloodsX = 0;
		var bloodsY = 384;

		if ((that.x + that.y) % 4 === 0 && that.keyPressed(keyState)) {
			that.frame++;
		}

		if (that.frame >= 4) {
			that.frame = 0;

			if (that.sY === 4) {
				that.sY = 52;
			} else {
				that.sY = 4;
			}
		}
		

		that.sX = (that.sWidth + 14) * that.frame + 7;

		ctx.save();
	  ctx.translate(that.x + that.width/2, that.y + that.height/2);
	  ctx.rotate(rotation);
		
		if (that.health < 190 && that.health > 70) {
			bloodsX = 0;
		} else if (that.health <= 70 && that.health > 50) {
			bloodsX = 48;
		} else if (that.health <= 50 && that.health > 25) {
			bloodsX = 96;
		} else if (that.health <= 25) {
			bloodsX = 142;
		} else {
			bloodsX = 196;
		}
		
		ctx.drawImage(element, that.sX, that.sY, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		ctx.drawImage(element, bloodsX, bloodsY, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
	  ctx.restore();
	}
	
	this.update = function(keyState) {
		//using hasOwnProperty caused diagonal movement failure
		//keyState.hasOwnProperty('LETTER_A')
		if (keyState[LETTER_A]) {
			that.x -= that.initialVelocity * that.velX;
		}

		if (keyState[LETTER_D]) {
			that.x += that.initialVelocity * that.velX;
		}

		if (keyState[LETTER_W]) {
			that.y -= that.initialVelocity * that.velY;
		}

		if (keyState[LETTER_S]) {
			that.y += that.initialVelocity * that.velY;
		}

		that.x = Math.max(Math.min(that.x, gameUI.getWidth() - 200 - that.width), 200);
		that.y = Math.max(Math.min(that.y, gameUI.getHeight() - 100 - that.height), 100);

		that.centerX = that.x + that.width / 2;
		that.centerY = that.y + that.height / 2;
	}
}