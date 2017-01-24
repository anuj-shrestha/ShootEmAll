function Player() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	var element = new Image();
	element.src = "images/shooter-sprite.png";

	this.x;
	this.y;

	this.playerCenterX = this.x + this.width / 2;
	this.playerCenterY = this.y + this.height / 2;
	this.playerRotation;
	
	this.type;
	this.state;

	this.sX = 0;
	this.sY = 0;
	this.width = 48;
	this.height = 48;
	this.sWidth = 48;

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

		if (that.x % 8 === 0 || that.y % 8 === 0){
			that.frame++;
			if (that.frame >= 4){
				that.frame = 0;
				if(that.sY === 0){
					that.sY = 48;
				}
				else {
					that.sY = 0;
				}
			}
		}

		that.sX = that.sWidth * that.frame;

		ctx.save();
	  ctx.translate(that.x + that.width/2, that.y + that.height/2);
	  ctx.rotate(rotation);
		ctx.drawImage(element, that.sX, that.sY, 48, 48, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
	  ctx.restore();

	}
	
	this.update = function(keyState) {
		
		if (keyState[letterA]){
				that.x -= 3;
			}
			if (keyState[letterD]){
				that.x += 3;
			}
			if (keyState[letterW]){
				that.y -= 3;
			}
			if (keyState[letterS]){
				that.y += 3;
			}
			that.x = Math.max(Math.min(that.x, gameUI.getWidth() - that.width), 0);
			that.y = Math.max(Math.min(that.y, gameUI.getHeight() - that.height), 0);

			that.playerCenterX = that.x + that.width / 2;
			that.playerCenterY = that.y + that.height / 2;

			// if (keyState[letterA] || keyState[letterD] || keyState[letterW] || keyState[letterS]){
			// 	this.frame += 0.25;
			// 	// console.log('frame', this.frame, this.sx);

			// 	if (this.frame == 1 || this.frame >= 5){
			// 		this.frame = 1;
			// 		this.sx = 0;
			// 	}
			// 	else if(Math.floor(this.frame) == 2){
			// 		this.sx = 48;
			// 	}
			// 	else if(Math.floor(this.frame) == 3){
			// 		this.sx = 96;
			// 	}
			// 	else if(Math.floor(this.frame) == 4){
			// 		this.sx = 142;
			// 	}
	}
}