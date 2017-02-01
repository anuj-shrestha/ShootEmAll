//Utility functions are definded here

var Utils = (function() {

	var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
		
		return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
	};

	var collisionCheck = function(objA, objB) {
	  // get the vectors to check against
	  var vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
	  var vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));

	  // add the half widths and half heights of the objects
	  var hWidths = (objA.width / 2) + (objB.width / 2);
	  var hHeights = (objA.height / 2) + (objB.height / 2);
	  var collisionDirection = null;

	  // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
	  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	    // figures out on which side we are colliding (top, bottom, left, or right)
	    var offsetX = hWidths - Math.abs(vX);
	    var offsetY = hHeights - Math.abs(vY);

	    if (offsetX >= offsetY) {

	      if (vY > 0) {
	        collisionDirection = 't';
	        objA.y += offsetY;
	      } 
	      
	      else if (vY < 0) {
	        collisionDirection = 'b';
	        objA.y -= offsetY;
	      }
	    } 
	    
	    else {
	      
	      if (vX > 0) {
	        collisionDirection = 'l';
	        objA.x += offsetX;
	      } 

	      else {
	        collisionDirection = 'r';
	        objA.x -= offsetX;
	      }
	    }
	  }

	  return collisionDirection;
	}

	var generateRandom = function(min, max) {

	    return Math.floor(Math.random()*(max-min+1)+min);
	  }

	return {

		getAABBIntersect: AABBIntersect,
		getRandom: generateRandom,
		getCollisionDirection: collisionCheck,
	};

} )();