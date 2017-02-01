// Main Game Class Through which give starting UI and calls the game

var ShootEmAll = (function() {

	var instance;

	function ShootEmAll() {
		console.log(View);
		var view = View.getInstance();

		var mainWrapper;
		var startScreen;
		var btnContainer;

		var startGameButton;

		//instances
		var shootEmAllGame;

		var that = this;

		this.init = function() {

			shootEmAllGame = new ShootEmAllGame();

			//main starting screen
			mainWrapper = view.getMainWrapper();
			startScreen = view.create('div');
			instructionContainer = view.create('div');
			startGameButton = view.create('div');

			startScreen.style.width = window.innerWidth + 'px';
			startScreen.style.height = window.innerHeight + 'px';

			view.addClass(instructionContainer, 'instruction-container');
			view.setHTML(instructionContainer, 'CONTROLS: A, W, S, D to move player. Mouse Click to shoot')
			view.addClass(startScreen, 'starting-screen');
			view.addClass(startGameButton, 'start-game-btn');

			view.append(startScreen, startGameButton);
			view.append(startScreen, instructionContainer);
			view.append(mainWrapper, startScreen);

			startGameButton.onclick = function() {

				shootEmAllGame.init(); // initiate game

				that.hideMainMenu();
			}
		}
		this.hideMainMenu = function() {
			view.style(startScreen, {display: 'none' });
		}

		this.showMainMenu = function() {
			view.style(startScreen, {display: 'block' });
		}
	}

	return {
		getInstance: function() {
			if (instance == null) {
				instance = new ShootEmAll();
			}

			return instance;
		}
	}

})();