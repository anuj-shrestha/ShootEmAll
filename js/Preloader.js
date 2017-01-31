// loads all necessary images
var Preloader = (function() {

	var instance;

	var Preloader = function() {

		var imageSources;
		var soundSources;

		var that = this;

		this.init = function() {

			imageSource = {
				1: 'images/shooter-sprites.png',
				2: 'images/the-town.png',
			}

			that.loadImages(imageSource);
		}

		this.loadImages = function(imageSources) {
			
			var images =  {};
			var loadedImages = 0;
			var totalImages = 0;
		}

		for (var key in imageSources) {

			totalImages++;
		}

		for (var key in imageSources) {

			images[key] = new Image();
			images[key].src = imageSources[key];

			images[key].onload = function() {
				loadedImages++;

				if(loadedImages >= totalImages) {
					that.initMainApp();
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

}());