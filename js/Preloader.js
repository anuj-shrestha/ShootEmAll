// loads all necessary images
function Preloader() {

	var view = View.getInstance();	

	var loadingPercentage;

	var imageSources;
	var soundSources;

	var that = this;

	this.init = function() {
		
		loadingPercentage = view.create('div');
		
		view.addClass(loadingPercentage, 'loading-percentage');
		view.setHTML(loadingPercentage, '0%');
		view.appendToBody(loadingPercentage);

		imageSource = {
			1: 'images/plain-walls.png',
			2: 'images/game-plain-bg.jpg',
			3: 'images/gui.png',
			4: 'images/power-up.png',
			5: 'images/player-enemy-sprites.png',
			6: 'images/trees.png',
			7: 'images/walls.png',
			8: 'images/enemy.png',
			9: 'images/game-bg.jpg',
			10: 'images/starting-screen.png',
			11: 'images/start-btn.png',
			12: 'images/friend-attacking.png',
			13: 'images/friend-walking.png'
		}

		that.loadImages(imageSource);
	}

	this.loadImages = function(imageSources) {
		
		var images = {};
		var loadedImages = 0;
		var totalImages = 0;
	
		for (var key in imageSources) {

			totalImages++;
		}

		for (var key in imageSources) {

			images[key] = new Image();
			images[key].src = imageSources[key];

			images[key].onload = function() {
				loadedImages++;
				percentage = Math.floor((loadedImages * 100) / totalImages);

				view.setHTML(loadingPercentage, percentage + '%'); //displaying percentage

				if(loadedImages >= totalImages) {
					view.removeFromBody(loadingPercentage);
					that.initMainApp();
				}
			}
		}
	}

	this.initMainApp = function() {

	  var shootEmAllInstance = ShootEmAll.getInstance();
	  shootEmAllInstance.init();
	}
}

window.onload = function() {

	var preloader = new Preloader();
	preloader.init();
}

