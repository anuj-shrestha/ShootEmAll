function Enemy() {
	var gameUI = gameUI.getInstance();

	var zombieCounter = 0;
	var maxZombie = 10;

	var element = new Image();
	element.src = "images/shooter-sprite.png";

	this.x;
	this.y;
	this.velX = 1;
	this.velY = 1;
	
	this.type;
	this.state;

	this.sX = 0;
	this.sY = 144;
	this.width = 48;
	this.height = 48;

	this.frame = 0;

	var that = this;

	this.draw = function() {

		if (that.x % 6 === 0 || that.y % 6 === 0){
			that.frame++;
			if (that.frame >= 3){
				that.frame = 0;
			}
		}

		// switch (that.frame) {
		// 	case 0: 
		// 		that.sx = 0;
		// 		break;
		// 	case 1: 
		// 		that.sx = 48;
		// 		break;
		// 	case 2: 
		// 		that.sx = 96;
		// 		break;
		// 	case 3: 
		// 		that.sx = 142;
		// 		break;
		// }

		that.sX = that.width * that.frame;
		gameUI.draw(element, that.sX, that.sY, that.width, that.height);

	}
	
	this.update = function() {
		that.velX = 1;
		that.velY = 1;
		that.x += that.velX;
		that.y += that.velY;
	}
}