// moving background
function Background() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var element = new Image();
	element.src = "images/game-bg-2.jpg"; // 2000 x 1250 size image is used


	console.log('bg width', element.width);
	this.x;
	this.y;
	
	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;
	
	this.width = 2000;
	this.height = 1250;

	this.sX = 0;
	this.sY = 0;
	this.sWidth = 2000;
	this.sHeight = 1250;
	this.frame = 0;
	
	this.centerX = this.width / 2;
	this.centerY = this.height / 2;

	this.x = -this.centerX;
	this.y = -this.centerY;
	this.xIncrement = 0;
	this.yIncrement = 0;

	var that = this;

	// this.setPosition = function(x, y) {
	// 	that.x = x;
	// 	that.y = y;
	// }

	this.setDimension = function(width, height) {
		that.width = width;
		that.height = height;
	}

	this.draw = function() {

		// if (that.x % 8 === 0 || that.y % 8 === 0){
		// 	that.frame++;
		// 	if (that.frame >= 4){
		// 		that.frame = 0;
		// 		if(that.sY === 0){
		// 			that.sY = 48;
		// 		}
		// 		else {
		// 			that.sY = 0;
		// 		}
		// 	}
		// }

		// that.sX = that.sWidth * that.frame;

		
		ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x, that.y, 2000, 1250);
		if (that.x < -500) {
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x + 2000, that.y, that.width, that.height);
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x + 2000, that.y + 1250, that.width, that.height);
		}
		if (that.x > 0) {
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x - 2000, that.y, that.width, that.height);
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x - 2000, that.y - 1250, that.width, that.height);
		}
		if (that.y < -500) {
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x, that.y + 1250, that.width, that.height);
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x - 2000, that.y + 1250, that.width, that.height);
		}
		if (that.y > 0) {
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x, that.y - 1250, that.width, that.height);
			ctx.drawImage(element, that.sX, that.sY, 2000, 1250, that.x + 2000, that.y - 1250, that.width, that.height);
		}
	}
	
	this.update = function(keyState) {
		
		if (keyState[letterA]){

			that.x += 2;
			that.xIncrement = 1;

		}
		else if (keyState[letterD]){

			that.x -= 2;
			that.xIncrement = -1;

		}
		else if (keyState[letterW]){
			
			that.y += 2;
			that.yIncrement = 1;

		}
		else if (keyState[letterS]){

			that.y -= 2;
			that.yIncrement = -1;

		}
		else{

			that.xIncrement = 0;
			that.yIncrement = 0;

		}

		// that.x = Math.max(Math.min(that.x, gameUI.getWidth() - that.width), 0);
		// that.y = Math.max(Math.min(that.y, gameUI.getHeight() - that.height), 0);

		that.centerX = that.x + that.width / 2;
		that.centerY = that.y + that.height / 2;

		
	}
}