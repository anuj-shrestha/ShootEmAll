// moving background
function Background() {

	var gameUI = GameUI.getInstance();
	var canvas = gameUI.getCanvas();
	var ctx = gameUI.getContext();

	var element = new Image();
	element.src = "images/game-plain-bg.jpg"; // 2000 x 1250 size image is used

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
	this.increment = 3;


	var that = this;

	this.setDimension = function(width, height) {
		that.width = width;
		that.height = height;
	}

	this.draw = function() {
		
		ctx.drawImage(element, that.sX, that.sY, that.width, that.sHeight, that.x, that.y, that.width, that.height);
		if (that.x < -500) {
			drawNewBg(that.width, 0);
			drawNewBg(that.width, that.height);
		}

		if (that.x > 0) {
			drawNewBg(-that.width, 0);
			drawNewBg(-that.width, -that.height);
		}

		if (that.y < -500) {
			drawNewBg(0, that.height);
			drawNewBg(-that.width, that.height);
		}

		if (that.y > 0) {
			drawNewBg(0, -that.height);
			drawNewBg(that.width, -that.height);
		}

		function drawNewBg(newX, newY) {
			ctx.drawImage(element, that.sX, that.sY, that.sWidth, that.sHeight, that.x + newX, that.y + newY, that.width, that.height);
		}
	}
	
	this.update = function(keyState) {
		
		if (keyState[letterA]){
			that.x += that.increment;
		}

		else if (keyState[letterD]){
			that.x -= that.increment;
		}

		else if (keyState[letterW]){
			that.y += that.increment;
		}

		else if (keyState[letterS]){
			that.y -= that.increment;
		}

		// to limit background movement upto background size
		// that.x = Math.max(Math.min(that.x, gameUI.getWidth() - that.width), 0);
		// that.y = Math.max(Math.min(that.y, gameUI.getHeight() - that.height), 0);

		that.centerX = that.x + that.width / 2;
		that.centerY = that.y + that.height / 2;
	}
}