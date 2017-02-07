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
			1: 'images/game-plain-bg.jpg',
			2: 'images/gui.png',
			3: 'images/power-up.png',
			4: 'images/player-enemy-sprites.png',
			5: 'images/trees.png',
			6: 'images/walls.png',
			7: 'images/enemy.png',
			8: 'images/starting-screen.png',
			9: 'images/start-btn.png',
			10: 'images/friend-walking.png'
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

