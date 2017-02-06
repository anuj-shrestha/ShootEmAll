function Elements() {
  var gameUI = GameUI.getInstance();
  var ctx = gameUI.getContext();

  var element = new Image();
  element.src = 'images/walls.png';

  var healthGUI = new Image();
  healthGUI.src = 'images/gui.png';

  var powerUpImage = new Image();
  powerUpImage.src = 'images/power-up.png';

  var treeImage = new Image();
  treeImage.src = 'images/trees.png';

  var letterA = 65;
  var letterD = 68;
  var letterW = 87;
  var letterS = 83;

  this.type;
  this.sX;
  this.sY = 0;
  this.x;
  this.y;
  this.width = 32;
  this.height = 32;
  this.sWidth;
  this.sHeight;
  this.health = 1000;
  this.rotation = 0;

  var that = this;

  this.verticalWall = function() {
    
    that.type = 1;
    that.sX = 0;
  }

  this.horizontalWall = function() {

    that.type = 2;
    that.sX = that.width * (that.type - 1);
  }

  this.plusWall = function() {

    that.type = 3;
    that.sX = that.width * (that.type - 1);
  }

  this.rightTWall = function() {

    that.type = 4;
    that.sX = that.width * (that.type - 1);
  }

  this.topTWall = function() {

    that.type = 5;
    that.sX = that.width * (that.type - 1);
  }

  this.leftTWall = function() {

    that.type = 6;
    that.sX = that.width * (that.type - 1);
  }

  this.downTWall = function() {

    that.type = 7;
    that.sX = that.width * (that.type - 1);
  }

  this.leftBottomCorner = function() {

    that.type = 8;
    that.sX = that.width * (that.type - 1);
  }

  this.rightBottomCorner = function() {

    that.type = 9;
    that.sX = that.width * (that.type - 1);
  }

  this.rightTopCorner = function() {

    that.type = 10;
    that.sX = that.width * (that.type - 1);
  }

  this.leftTopCorner = function() {

    that.type = 11;
    that.sX = that.width * (that.type - 1);
  }

  this.leftEnd = function() {

    that.type = 12;
    that.sX = that.width * (that.type - 1);
  }

  this.topEnd = function() {

    that.type = 13;
    that.sX = that.width * (that.type - 1);
  }

  this.rightEnd = function() {

    that.type = 14;
    that.sX = that.width * (that.type - 1);
  }

  this.bottomEnd = function() {

    that.type = 15;
    that.sX = that.width * (that.type - 1);
  }

  this.emptyHealthUI = function() {

    that.type = 16;
    that.x = 0;
    that.y = 0;
    that.sX = 20;
    that.sWidth = 20;
    that.sHeight = 20;
    that.width = 100;
    that.height = 100;
  }

  this.healthUI = function() {

    that.type = 17;
    that.x = 0;
    that.y = 0;
    that.sX = 0;
    that.sWidth = 20;
    that.sHeight = 20;
    that.width = 100;
    that.height = 100;
  }

  this.gunPowerUp = function() {

    that.type = 18;
    that.x = Utils.getRandom(50, 800);
    that.y = Utils.getRandom(50, 600);
    that.sX = 100;
    that.sY = 0;
    that.sWidth = 100;
    that.sHeight = 100;
    that.width = 100;
    that.height = 100;
  }

  this.healthPowerUp = function() {

    that.type = 19;
    that.x = Utils.getRandom(50, 800);
    that.y = Utils.getRandom(50, 600);
    that.sX = 0;
    that.sY = 0;
    that.sWidth = 100;
    that.sHeight = 100;
    that.width = 100;
    that.height = 100;
  }

  this.bombPowerUp = function() {

    that.type = 20;
    that.x = Utils.getRandom(50, 500);
    that.y = Utils.getRandom(50, 500);
    that.sX = 200;
    that.sY = 0;
    that.sWidth = 100;
    that.sHeight = 100;
    that.width = 100;
    that.height = 100;
  }

  this.tree1 = function() {

    that.type = 21;
    that.x = Utils.getRandom(1200, 3000);
    that.y = Utils.getRandom(-1000, 1000);
    that.sX = 0;
    that.sY = 0;
    that.sWidth = 232;
    that.sHeight = 240;
    that.width = 232;
    that.height = 240;
  }

  this.tree2 = function() {

    that.type = 22;
    that.x = Utils.getRandom(1200, 3000);
    that.y = Utils.getRandom(-1000, 1000);
    that.sX = 232;
    that.sY = 0;
    that.sWidth = 232;
    that.sHeight = 240;
    that.width = 232;
    that.height = 240;
  }

  this.getBase = function() {

    that.type = 23;
    that.x = 0;
    that.y = 0;
    that.sX = 300;
    that.sY = 0;
    that.sWidth = 100;
    that.sHeight = 100;
    that.width = 150;
    that.height = 150;
  }

  this.resqueZone = function() {

    that.type = 24;
    that.x = 400;
    that.y = 200;
    that.sX = 400;
    that.sY = 0;
    that.sWidth = 100;
    that.sHeight = 100;
    that.width = 150;
    that.height = 150;
  }

  this.update = function(keyState) {

    if (keyState[letterA]){
      that.x += 3;
    }

    else if (keyState[letterD]){
      that.x -= 3;
    }

    else if (keyState[letterW]){
      that.y += 3;
    }

    else if (keyState[letterS]){
      that.y -= 3;
    }

    else{
      that.xIncrement = 0;
    }
  }

  this.updateHealthUI = function(health) {
    that.y = health * 100 / 100;
    that.sY = health * 20 / 100;
    that.height = (100 - health);
    that.sHeight = (100 - health) * 20 / 100; 
  }

  this.draw =  this.draw = function() {
    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.drawHealthUI = function() {
    gameUI.draw(healthGUI, that.sX, that.sY, that.sWidth, that.sHeight, that.x, that.y, that.width, that.height)
  }

  this.drawPowerUp = function() {
    gameUI.draw(powerUpImage, that.sX, that.sY, that.sWidth, that.sHeight, that.x, that.y, that.width, that.height)
  }

  this.drawTrees = function() {
    gameUI.draw(treeImage, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  }

  this.drawBase = function() {
    ctx.save();
    ctx.translate(that.x + that.width/2, that.y + that.height/2);
    ctx.rotate(that.rotation);
    ctx.drawImage(powerUpImage, that.sX, that.sY, that.sWidth, that.sWidth, that.width/2 * -1, that.height/2 * -1, that.width, that.height);
    ctx.restore();
  }

  this.elementCollisionCheck = function(collider) {

    var collisionDirection = Utils.getCollisionDirection(collider, that);

    return collisionDirection;
  }
}
