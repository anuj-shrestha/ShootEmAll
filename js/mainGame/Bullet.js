function Bullet() {
	var gameUI = GameUI.getInstance();
	var ctx = gameUI.getContext();
	var element = new Image();
	element.src = 'images/shooter-sprite.png';

	this.x;
	this.y;
	this.velX;
	this.velY;

	this.sX = 0;
	this.sY = 96;
	this.width = 24;
	this.height = 24;

	var that = this;

	this.init = function(x, y, direction) {
		that.velX = 1 * direction;
		that.velY = 1;
		that.x = x + 20;
		that.y = y + that.height;
		that.sX = 0;
	}

	this.draw = function(rotation) {
		ctx.save();
		console.log('draw bullet', rotation, this.x, this.y);

	    ctx.translate(that.x + that.width/2, that.y + that.height/2);

	    ctx.rotate(rotation);
	 
		ctx.drawImage(shooterImage, that.sX, that.sY, 24, 24, that.width/2 * -1, that.height/2 * -1, that.width, that.height);

	    ctx.restore();	  
	}

  	this.update = function(mx, my) {

    var destinationX = mx - that.x + 0.1;
    var destinationY = my - that.y + -0.1;
    
    var xIncrement = (destinationX)/Math.abs(destinationX);
    var yIncrement = destinationY/Math.abs(destinationY);
    // console.log('enmy destination', mx, my);

    that.x += xIncrement;
    that.y += yIncrement;
    // that.x += 1;
    // that.y += 1;
  }

}