// Main Game Class Through which give starting UI and calls the game

var ShootEmAll = (function() {

	var instance;

	function ShootEmAll() {

		var view = View.getInstance();

		var mainWrapper;
		var startScreen;
		var instructionContainer;
		var playerName;
		var missionLvl = 0;

		var startGameButton;
		var startMissionButton;
		var selectPlayerButtonAnuj;
		var selectPlayerButtonShyam;
		var selectPlayerButtonHari;


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
			startMissionButton = view.create('div');
			selectPlayerButtonAnuj = view.create('div');
			selectPlayerButtonShyam = view.create('div');
			selectPlayerButtonHari = view.create('div');

			startScreen.style.width = window.innerWidth + 'px';
			startScreen.style.height = window.innerHeight + 'px';

			view.addClass(instructionContainer, 'instruction-container');
			view.setHTML(instructionContainer, 'CONTROLS: A, W, S, D to move player. Mouse Click to shoot')
			view.addClass(startScreen, 'starting-screen');
			view.addClass(startGameButton, 'start-game-btn');
			view.addClass(startMissionButton, 'start-mission-btn');
			view.addClass(selectPlayerButtonAnuj, 'select-player-btn-anuj');
			view.setHTML(selectPlayerButtonAnuj, 'Anuj Shrestha, The Killer');
			view.addClass(selectPlayerButtonShyam, 'select-player-btn-shyam');
			view.setHTML(selectPlayerButtonShyam, 'Shyam Lal, The Hero');
			view.addClass(selectPlayerButtonHari, 'select-player-btn-hari');
			view.setHTML(selectPlayerButtonHari, 'Harke Hari, The Saviour');

			view.append(startScreen, startGameButton);
			view.append(startScreen, startMissionButton);
			view.append(startScreen, selectPlayerButtonAnuj);
			view.append(startScreen, selectPlayerButtonShyam);
			view.append(startScreen, selectPlayerButtonHari);
			view.append(startScreen, instructionContainer);
			view.append(mainWrapper, startScreen);

			selectPlayerButtonAnuj.onmouseover = function() {

				view.setHTML(selectPlayerButtonAnuj, 'Health = 100, Speed = 4, Damage = 150%');
			}

			selectPlayerButtonAnuj.onmouseout = function() {

				view.setHTML(selectPlayerButtonAnuj, 'Anuj Shrestha, The Killer');
			}

			selectPlayerButtonAnuj.onclick = function() {

				playerName = 'anuj';
				view.style(selectPlayerButtonAnuj, {background: 'green' });
				view.style(selectPlayerButtonShyam, {background: 'silver' });
				view.style(selectPlayerButtonHari, {background: 'pink' });

			}

			selectPlayerButtonShyam.onmouseover = function() {

				view.setHTML(selectPlayerButtonShyam, 'Health = 400, Speed = 2, Damage = 110%');
			}

			selectPlayerButtonShyam.onmouseout = function() {

				view.setHTML(selectPlayerButtonShyam, 'Shyam Lal, The Hero');
			}
			selectPlayerButtonShyam.onclick = function() {

				playerName = 'shyam';
				view.style(selectPlayerButtonShyam, {background: 'green' });
				view.style(selectPlayerButtonAnuj, {background: 'teal' });
				view.style(selectPlayerButtonHari, {background: 'pink' });
			}

			selectPlayerButtonHari.onmouseover = function() {

				view.setHTML(selectPlayerButtonHari, 'Health = 200, Speed = 3, Damage = 100%');
			}

			selectPlayerButtonHari.onmouseout = function() {

				view.setHTML(selectPlayerButtonHari, 'Harke Hari, The Saviour');
			}

			selectPlayerButtonHari.onclick = function() {

				playerName = 'hari';
				view.style(selectPlayerButtonHari, {background: 'blue' });
				view.style(selectPlayerButtonAnuj, {background: 'teal' });
				view.style(selectPlayerButtonShyam, {background: 'silver' });
			}

			startGameButton.onclick = function() {

				shootEmAllGame.init(playerName, missionLvl); // initiate game
				that.hideMainMenu();
			}

			startMissionButton.onclick = function() {

				missionLvl = 1;
				shootEmAllGame.init(playerName, missionLvl); // initiate game
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