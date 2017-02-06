function Enemy() {

	var gameUI = GameUI.getInstance();
	var ctx = gameUI.getContext();

	var zombieCounter = 0;
	var maxZombie = 10;

	var element = new Image();
	element.src = "images/player-enemy-sprites.png";

	var hostageWalkingImage = new Image();
	hostageWalkingImage.src = 'images/friend-walking.png';

	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	var playerDistance;

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
	this.baseDistance;
	this.hostageDistance;
	this.found = true;

	var that = this;

	this.draw = function(rotation, base, hostage) {

		if (that.baseDistance < playerDistance) {
			rotation = Math.atan2((base.y - that.y), (base.x - that.x)) - Math.PI / 2;
		}
		else if (that.hostageDistance < playerDistance) {
			rotation = Math.atan2((hostage.y - that.y), (hostage.x - that.x)) - Math.PI / 2;
		}

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
			ctx.drawImage(element, 0, 384, that.sWidth, that.sWidth,
			  that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 70 && that.health > 50){
			ctx.drawImage(element, 48, 384, that.sWidth, that.sWidth, 
				that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 50 && that.health > 25){
			ctx.drawImage(element, 96, 384, that.sWidth, that.sWidth, 
				that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}

		else if (that.health <= 25){
			ctx.drawImage(element, 142, 384, that.sWidth, that.sWidth, 
				that.width/2 * -1, that.height/2 * -1, that.width, that.height);
		}
		
		if (that.sX === 96 && that.sY === 288 && that.time % 5 === 0){
			ctx.drawImage(element, that.sX, that.sY + 48, that.sWidth, that.sWidth, 
				that.width/2 * -1, that.height/2, that.width, that.height);
		}
		ctx.restore();		

	}
	
	this.update = function(player, base, hostage, keyState) {

		that.time++;

		if (base != null) {
			that.baseDistance = Utils.getDistance(that, base);
			playerDistance = Utils.getDistance(that, player)
		}

		else if (hostage != null) {
			that.hostageDistance = Utils.getDistance(that, hostage);
			playerDistance = Utils.getDistance(that, player)
		}

		if (that.baseDistance < playerDistance) {
			that.destinationX = base.x - that.x + 0.1;
			that.destinationY = base.y - that.y + 0.1;
		}

		else if (that != hostage && that.hostageDistance < playerDistance && hostage.found) {
			that.destinationX = hostage.x - that.x + 0.1;
			that.destinationY = hostage.y - that.y + 0.1;
		}

		else {
			that.destinationX = player.x - that.x + 0.1;
			that.destinationY = player.y - that.y + 0.1;
		}
		
		
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
	}

	this.hostage = function(player) {

		that.x = Utils.getRandom(-2000, 3000);
		that.y = Utils.getRandom(-1000, 2000);

		if (Math.abs(that.x - player.x) < 1000 && 
			Math.abs(that.y - player.y) < 1000) {
			that.x += 1000;
			that.y += 1000;
		}
	  that.sX = 0;
	  that.sY = 0;
	  that.sWidth = 200;
	  that.sHeight = 250;
	  that.width = 100;
	  that.height = 100;
	  that.velX = 0;
	  that.velY = 0;
	  that.found = false;
	}

	this.drawHostage = function(rotation) {
		
		if (that.time % 8 === 0 || that.time % 8 === 0){
			that.frame++;

			if (that.frame >= 4){
				that.frame = 0;
				that.sY += 290;

				if (that.sY >= 290 * 2) {
					that.sY = 0;
				}
			}			
		}

		that.sX = (that.sWidth + 30) * that.frame;

		ctx.save();
	  ctx.translate(that.x + that.width/2, that.y + that.height/2);
	  ctx.rotate(that.rotation);
	  ctx.drawImage(hostageWalkingImage, that.sX, that.sY, that.sWidth, that.sWidth,
	   that.width/2 * -1, that.height/2 * -1, that.width, that.height);
	  ctx.restore();
	}

	this.elementCollisionCheck = function(collider) {

		var collisionDirection = Utils.getCollisionDirection(collider, that);

		if (collisionDirection == 'l' || collisionDirection == 'r') {
		  collider.velX = 0;
		}

		else if (collisionDirection == 't' || collisionDirection == 'b') {
		  collider.velY = 0;
		}

		return collisionDirection;
	}
}