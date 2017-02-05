function Bullet() {
	
	var gameUI = GameUI.getInstance();
	var ctx = gameUI.getContext();

	var element = new Image();
	element.src = 'images/player-enemy-sprites.png';

	this.x;
	this.y;
	this.velX = 5;
	this.velY = 5;

	this.sX = 0;
	this.sY = 96;
	this.width = 24;
	this.height = 24;
	this.frame = 0;

	this.destinationX;
	this.destinationY;
	this.rotation;
	this.xIncrement;
	this.yIncrement;

	this.collisionState = false;
	this.butlletFromBase = false;

	var that = this;

	this.init = function(x, y, direction, mx, my, rotation) {

		that.velX = 10;
		that.velY = 10;
		that.x = x + 24;
		that.y = y + 36;

		if (direction % 2 == 0){
			var temp = that.x;
			that.x = x + 48;
			that.y = y + 10;
			// that.y = temp;
		}

		that.sX = 0;
		that.rotation = rotation;
		that.destinationX = mx - that.x + 0.1;
		that.destinationY = my - that.y + 0.1;

		var slope = Math.max(Math.abs(that.destinationX), Math.abs(that.destinationY));
		that.xIncrement = that.destinationX / slope;
		that.yIncrement = that.destinationY / slope;

	}

	this.draw = function() {

		that.sX = that.width * that.frame;
			 
		ctx.save();
	    ctx.translate(that.x + that.width/2, that.y + that.height/2);
	    ctx.rotate(that.rotation);
		ctx.drawImage(element, that.sX, that.sY, 24, 24, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
	    ctx.restore();  
	}

  	this.update = function() {

    that.x += that.velX * that.xIncrement;
    that.y += that.velY * that.yIncrement;

  }

}