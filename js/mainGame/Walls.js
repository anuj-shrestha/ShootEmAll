//Create Walls here
function Walls() {

	var gameUI = GameUI.getInstance();

	var element = new Image();;
	element.src = 'images/walls.png';

	var map = {
		1: '[[11,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,10],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[8,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,9]]'
	};
	var mapLevel = JSON.parse(map[1]);
	var wallElements = [];

	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	this.type;
	this.x = 200;
	this.y = 100;
	this.width = 640;
	this.height = 640;

	var that = this;

	for (var row = 0; row < mapLevel.length; row++) {

		for (var column = 0; column < mapLevel[row].length; column++) {

		  switch (mapLevel[row][column]) {
    		case 1: //verticalWall
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.verticalWall();
        wallElements.push(elements);
      	break;

      	case 2: //horizontalWall
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.horizontalWall();
        wallElements.push(elements);
      	break;

      	case 8: //leftBottomCorner
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.leftBottomCorner();
        wallElements.push(elements);
      	break;

      	case 9: //rightBottomCorner
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.rightBottomCorner();
        wallElements.push(elements);
      	break;

      	case 10: //rightTopCorner
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.rightTopCorner();
        wallElements.push(elements);
      	break;

      	case 11: //leftTopCorner
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.leftTopCorner();
        wallElements.push(elements);
      	break;

      	case 12: //leftTopCorner
	    	var elements = new Elements();
        elements.x = this.x + column * 32;
        elements.y = this.y + row * 32;
        elements.leftTopCorner();
        wallElements.push(elements);
      	break;
			}
		}
	}

	this.update = function(keyState) {

  	for (var i = 0; i < wallElements.length; i++) {

  		var wallElement = wallElements[i];

	    if (keyState[letterA]){
	      wallElement.x += 3;
	    }

	    else if (keyState[letterD]){
	      wallElement.x -= 3;
	    }

	    else if (keyState[letterW]){
	      wallElement.y += 3;
	    }

	    else if (keyState[letterS]){
	      wallElement.y -= 3;
	    }

	    if (wallElement.health <= 0) {
  			wallElement = null;
  			wallElements.splice(i, 1);
  		}
    }
	}

	this.draw = function() {

  	for (var i = 0; i < wallElements.length; i++) {

	  	var wallElement = wallElements[i];
	    gameUI.draw(element, wallElement.sX, wallElement.sY, wallElement.width, wallElement.height, 
	    	wallElement.x, wallElement.y, wallElement.width, wallElement.height);
	    gameUI.writeText(wallElement.health, 10, wallElement.x + 10, wallElement.y + 20);

  	}
	}

	this.wallEnemyCollisionCheck = function(collider) {

  	for (var i = 0; i < wallElements.length; i++) {

	  	var wallElement = wallElements[i];
	  	var collisionDirection = Utils.getCollisionDirection(collider, wallElement);

			if (collisionDirection == 'l' || collisionDirection == 'r') {
				collider.velX = 0;
				collider.velY = collider.initialVelocity * 1.5;
				collider.sY = 288;
				wallElement.health--;
	  	}

	  	else if (collisionDirection == 't' || collisionDirection == 'b') {
	  		collider.velY = 0;
  			collider.velX = collider.initialVelocity * 1.5;
  			collider.sY = 288;
  			wallElement.health--;
  		}
		}  		

		for (var j = 0; j < wallElements.length; j++){

			var wallElement = wallElements[j];
			var collisionDirection = Utils.getCollisionDirection(collider, wallElement);

			if (collisionDirection == null) {
			collider.velX = collider.initialVelocity;
			collider.velY = collider.initialVelocity;	
			}
		}
	}

	this.playerCollisionWithWallCheck = function(collider) {

		for (var i = 0; i < wallElements.length; i++) {

		  var wallElement = wallElements[i];
			var collisionDirection = Utils.getCollisionDirection(collider, wallElement);
		}
	}

	this.bulletWallCollisionCheck = function(collider) {

  	for (var i = 0; i < wallElements.length; i++) {

	  	var wallElement = wallElements[i];
	  	var collisionCase = Utils.getAABBIntersect(collider.x, collider.y, 
	  		collider.width, collider.height, wallElement.x, wallElement.y, wallElement.width, wallElement.height);

	  	if (collisionCase) {
	  		return i;
	  	}
		}
	}
}
