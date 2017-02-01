function GameSound() {

  var gameSong;
  var playerDie;
  var playerPain;
  var killEnemy;
  var bullet;
  var machineGun;
  var bulletHit;

  var that = this;

  this.init = function() {
    gameSong = new Audio('sounds/song.wav');
    playerDie = new Audio('sounds/player-die.wav');
    playerPain = new Audio('sounds/player-pain.wav');
    killEnemy = new Audio('sounds/kill-enemy.wav');
    bullet = new Audio('sounds/bullet.wav');
    machineGun = new Audio('sounds/machine-gun.wav');
    bulletHit = new Audio('sounds/bullet-hit.wav');

  }

  this.play = function(element) {
   
    if (element == 'playerDie') {
      playerDie.pause();
      playerDie.currentTime = 0;
      playerDie.play();
    }

    if (element == 'playerPain') {
      playerPain.pause();
      playerPain.currentTime = 0;
      playerPain.play();
    }  

    else if (element == 'killEnemy') {
      killEnemy.pause();
      killEnemy.currentTime = 0;
      killEnemy.play();
    } 

    else if (element == 'bullet') {
      bullet.pause();
      bullet.currentTime = 0;
      bullet.play();
    } 

    else if (element == 'machineGun') {
      machineGun.pause();
      machineGun.play();

      if (machineGun.ended) {
       machineGun.currentTime = 0;
      }
    } 

    else if (element == 'bulletHit') {
      bulletHit.pause();
      bulletHit.currentTime = 0;
      bulletHit.play();
    } 

    else if (element == 'gameSong') {
      gameSong.pause();
      gameSong.currentTime = 0;
      gameSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      gameSong.play();
    } 
  }

  this.stopMachineGunSound = function() {
    machineGun.pause();
  }
}
