
(function() {
	// constants are defined here
	
	var WIDTH = 900;
	var HEIGHT = 500;
	var shooterImage = document.getElementById('shooterImage');

	// console.log('here', HEIGHT, WIDTH);

	//canvas
	var canvas;
	var ctx;

	var keyState;
	var letterA = 65;
	var letterD = 68;
	var letterW = 87;
	var letterS = 83;

	var mouse = {
	  x: 0,
	  y: 0
	};

	function getRandom(min, max) {

    return Math.floor(Math.random()*(max-min+1)+min);
  }

	function Player() {

		this.x = 200;
		this.y = 200;
		this.element;

		this.width = 48;
		this.height = 48;

		this.frame = 1;
		this.sx = 0;
		this.sy = 0;

		
		this.init = function() {

		}

		this.update = function() {

			if (keyState[letterA]){
				this.x -= 3;
			}
			if (keyState[letterD]){
				this.x += 3;
			}
			if (keyState[letterW]){
				this.y -= 3;
			}
			if (keyState[letterS]){
				this.y += 3;
			}

			if (keyState[letterA] || keyState[letterD] || keyState[letterW] || keyState[letterS]){
				this.frame += 0.25;
				// console.log('frame', this.frame, this.sx);

				if (this.frame == 1 || this.frame >= 5){
					this.frame = 1;
					this.sx = 0;
				}
				else if(Math.floor(this.frame) == 2){
					this.sx = 48;
				}
				else if(Math.floor(this.frame) == 3){
					this.sx = 96;
				}
				else if(Math.floor(this.frame) == 4){
					this.sx = 142;
				}
				
			}

			this.gunPointX = this.x + this.width / 2;
			this.gunPointY = this.y + this.height / 2;

			this.x = Math.max(Math.min(this.x, WIDTH - this.width), 0);
			this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);

		}

		this.draw = function(rotation) {

			ctx.save();
			console.log(this.x, this.y);

	    ctx.translate(this.x + this.width/2, this.y + this.height/2);

	    ctx.rotate(rotation);
	 
			ctx.drawImage(shooterImage, this.sx, this.sy, 48, 48, this.width/2 * -1, this.height/2 * -1, this.width, this.height);

	    ctx.restore();

		}

	}

	//create canvas
	function View() {
		function init() {


		}
	}

	//main game function
	var ShootEmAll = function() {
		
		// var mainWrapper = document.getElementsByClassName(
		// 	'main-wrapper');

		var that = this;
		var bgLoaded = false;

		canvas = document.createElement('canvas');
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);

		var imageObj = new Image();
    imageObj.src = './images/the-town.png';

    imageObj.onload = function() {
			  ctx.drawImage(imageObj, 0, 0, 700, 700, 0, 0, 700, 700);
			};

		canvas.addEventListener('mousemove', function(evt) {

	        var m = getMousePos(canvas, evt);
	        mouse.x = m.x;
	        mouse.y = m.y;

	    }, false);


		View();

		this.init = function() {

			this.player = new Player();
			this.player.x = 0;
			this.player.y = 0;
			this.player.height = 48;
			this.player.width = 48;

			var loop = function() {

				update();
				draw();
				window.requestAnimationFrame(loop, canvas);
			};

			window.requestAnimationFrame(loop, canvas);
		}

		function update() {

			that.player.update();

		}

		function draw() {

			// ctx.fillStyle = 'black';
			// ctx.fillRect(0,0,WIDTH,HEIGHT);
			// ctx.fillStyle = '#ffffff';
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			// ctx.drawImage(imageObj, 0, 0, 700, 700, 0, 0, 700, 700);

			var targetX = mouse.x - that.player.x;
		  var targetY = mouse.y - that.player.y;
		  var rotation = Math.atan2(targetY, targetX) - Math.PI / 2;

			ctx.fillText("mouse x: " + mouse.x + " ~ mouse y:" + mouse.y + " ~ rotation: " + rotation, 30, 30);

			that.player.draw(rotation);
			// ctx.clearRect(0,0,WIDTH,HEIGHT);

			ctx.beginPath(); 
	    ctx.lineWidth="1";
	    ctx.strokeStyle="green"; // Green path
	    ctx.setLineDash([5, 15]);
	    ctx.moveTo(that.player.gunPointX, that.player.gunPointY);
	    ctx.lineTo(mouse.x,  mouse.y);
	    ctx.stroke(); // Draw it

		}

		function getMousePos(canvas, evt){

	    var rect = canvas.getBoundingClientRect();
	    var mouseX = evt.clientX - rect.left;
	    var mouseY = evt.clientY - rect.top;
	    // var mouseX = evt.clientX - rect.top;
	    // var mouseY = evt.clientY - rect.left;
	    console.log('canvas', rect.top, rect.left);

	    return {
	        x: mouseX,
	        y: mouseY
	    };
		}

			// keep track of keypressed 
		keyState = {};
		document.addEventListener('keydown', function(evt){
			keyState[evt.keyCode] = true;
		});

		document.addEventListener('keyup', function(evt){
			delete keyState[evt.keyCode];
		});

	}

	
	
	new ShootEmAll().init();

})();