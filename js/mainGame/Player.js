function Player() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	var element = new Image();
	element.src = "images/player-enemy-sprites.png";

	this.x;
	this.y;
	this.velX = 1;
	this.velY = 1;

	this.centerX = this.x + this.width / 2;
	this.centerY = this.y + this.height / 2;
	this.playerRotation;
	
	this.type;
	this.state;
	this.health = 200;

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

	this.setDimension = function(width, height) {
		that.width = width;
		that.height = height;
	}

	this.draw = function(rotation) {

		if (that.x % 8 === 0 || that.y % 8 === 0) {
			that.frame++;

			if (that.frame >= 4) {
				that.frame = 0;

				if (that.sY === 4) {
					that.sY = 48+4;
				}

				else {
					that.sY = 4;
				}
			}
		}

		that.sX = (that.sWidth + 14) * that.frame +7;

		ctx.save();
	  ctx.translate(that.x + that.width/2, that.y + that.height/2);
	  ctx.rotate(rotation);
		ctx.drawImage(element, that.sX, that.sY, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);

		if (that.health < 190 && that.health > 70){
			ctx.drawImage(element, 0, 384, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 70 && that.health > 50){
			ctx.drawImage(element, 48, 384, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 50 && that.health > 25){
			ctx.drawImage(element, 96, 384, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 25){
			ctx.drawImage(element, 142, 384, that.sWidth, that.sHeight, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}
		
	  ctx.restore();
	}
	
	this.update = function(keyState) {
		
		if (keyState[letterA]) {
				that.x -= 3 * that.velX;
		}

		if (keyState[letterD]) {
			that.x += 3 * that.velX;
		}

		if (keyState[letterW]) {
			that.y -= 3 * that.velY;
		}

		if (keyState[letterS]) {
			that.y += 3 * that.velY;
		}

		that.x = Math.max(Math.min(that.x, gameUI.getWidth() - that.width), 0);
		that.y = Math.max(Math.min(that.y, gameUI.getHeight() - that.height), 0);

		that.centerX = that.x + that.width / 2;
		that.centerY = that.y + that.height / 2;
	}
}