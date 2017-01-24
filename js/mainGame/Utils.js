//Utility functions are definded here

var Utils = (function() {

	var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
		
		return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
		
	};

	var generateRandom = function(min, max) {

	    return Math.floor(Math.random()*(max-min+1)+min);
	  }

	return {

		getAABBIntersect: AABBIntersect,
		getRandom: generateRandom,
		
	};

} )();