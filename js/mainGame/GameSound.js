// game sound class defined here
function GameSound() {

  var gameSong;
  var playerDie;
  var playerPain;
  var killEnemy;
  var bullet;
  var machineGun;
  var bulletHit;
  var powerUpSound;

  var that = this;

  this.init = function() {

    gameSong = new Audio('sounds/song.wav');
    playerDie = new Audio('sounds/player-die.wav');
    playerPain = new Audio('sounds/player-pain.wav');
    killEnemy = new Audio('sounds/kill-enemy.wav');
    bullet = new Audio('sounds/bullet.wav');
    machineGun = new Audio('sounds/machine-gun.wav');
    bulletHit = new Audio('sounds/bullet-hit.wav');
    powerUpSound = new Audio('sounds/oh-yeah.wav');
  }

  this.play = function(element) {

    switch (element) {
      case 'playerDie':
        playerDie.pause();
        playerDie.currentTime = 0;
        playerDie.play();
        break;

      case 'playerPain':
        playerPain.pause();
        playerPain.play();

        if (playerPain.ended) {
         playerPain.currentTime = 0;
        }
        break;

      case 'killEnemy':
        killEnemy.pause();
        killEnemy.play();

        if (killEnemy.ended) {
         killEnemy.currentTime = 0;
        }
        break;

      case 'bullet':
        bullet.pause();
        bullet.currentTime = 0;
        bullet.play();
        break;

      case 'machineGun':
        machineGun.pause();
        machineGun.play();

        if (machineGun.ended) {
         machineGun.currentTime = 0;
        }
        break;

      case 'bulletHit':
        bulletHit.pause();
        bulletHit.play();

        if (bulletHit.ended) {
         bulletHit.currentTime = 0;
        }
        break;

      case 'powerUpSound':
        powerUpSound.pause();
        powerUpSound.currentTime = 0;
        powerUpSound.play();
        break;

      case 'bullet':
        bullet.pause();
        bullet.currentTime = 0;
        bullet.play();
        break;

      case 'gameSong':
        gameSong.pause();
        gameSong.currentTime = 0;
        gameSong.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
        }, false);
        gameSong.play();
        break;
    }
  }

  this.stopMachineGunSound = function() {

    machineGun.pause();
  }

  this.stopGameSong = function() {

    gameSong.pause();
  }
}
