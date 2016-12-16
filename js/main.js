var Nakama = {};
Nakama.Configs = {
    BULLET_SPEED : 200
}

window.onload = function(){
  Nakama.game = new Phaser.Game(1008, 720, Phaser.AUTO, '',{
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

var preload = function(){
  Nakama.game.scale.minWidth = 504;
  Nakama.game.scale.minHeight = 360;
  Nakama.game.scale.maxWidth = 1008;
  Nakama.game.scale.maxHeight = 720;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.load.image('background', 'Assets/background.jpg');
  Nakama.game.load.image('wall', 'Assets/wall.png');
  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.spritesheet('enemy', 'Assets/george.png', 48, 48);
  Nakama.game.load.spritesheet('player', 'Assets/betty.png', 48, 48);
  Nakama.game.load.image('stone', 'Assets/stone.png');
  Nakama.game.load.image('treasure', 'Assets/treasure.png');
  Nakama.game.time.advancedTiming = true;
  Nakama.game.load.image('bomb', 'Assets/bomb.png');
}

var number;
var numberText = 0;
var health;
var healthText;
// var treasure;
var endText;
var timeSuper = 0;
var enemyArray= [];
// var player1;

var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.game.add.sprite(0, 0, "background");

  Nakama.platforms = Nakama.game.add.physicsGroup();
  Nakama.treasures = Nakama.game.add.physicsGroup();
  Nakama.bombGroup = Nakama.game.add.physicsGroup();
  Nakama.bombEnemyGroup = Nakama.game.add.physicsGroup();
  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.bulletEnemyGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.players = [];
  Nakama.bombsPlayer = [];
  Nakama.bombsEnemy = [];
  Nakama.enemys = [];

  var map1 = new Map();

  number = Nakama.enemys.length;
  numberText = Nakama.game.add.text(12, 12, 'Enemys:' + number, { fontSize: '32px', fill: '#000' });

  player1 = new Player(48, 48, {
    up   : Phaser.Keyboard.UP,
    down : Phaser.Keyboard.DOWN,
    left : Phaser.Keyboard.LEFT,
    right: Phaser.Keyboard.RIGHT,
    fire : Phaser.Keyboard.SPACEBAR,
  });
  Nakama.players.push(player1);

  health = player1.sprite.health;
  healthText = Nakama.game.add.text(220, 12, 'Health:' + health, { fontSize: '32px', fill: 'red' });
  endText = Nakama.game.add.text(Nakama.game.world.centerX,Nakama.game.world.centerY,' ', { font: '84px Arial', fill: 'red' });
  endText.anchor.setTo(0.5, 0.5);
  endText.visible = false;

}

var update = function(){
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.platforms);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.bombGroup);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.bombEnemyGroup);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.bombGroup);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.platforms);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.treasures);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.treasures);

  timeSuper += Nakama.game.time.physicsElapsed;

  for (var i = 0; i<Nakama.players.length; i++){
    Nakama.players[i].update();
  }

  for (var i = 0; i<Nakama.bombsPlayer.length; i++){
    Nakama.bombsPlayer[i].update();
  }

  for (var i = 0; i<Nakama.bombsEnemy.length; i++){
    Nakama.bombsEnemy[i].update();
  }

  for (var i = 0; i<Nakama.enemys.length; i++){
    Nakama.enemys[i].update();
  }


  health = player1.sprite.health;
  if ( health ==0 ){
    endText.text=" You loss \n Enter to restart";
    endText.visible = true;
    if(Nakama.keyboard.isDown(Phaser.Keyboard.ENTER)){
      create();
    }
  }
  healthText.text = 'Health: ' + health;

  if (timeSuper >= 1){
    Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, onPlayerHitEnemy);
    Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.playerGroup, onBulletHitPlayer);
    Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.playerGroup, onBulletHitPlayer);
  }
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitEnemy);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.treasures, onPlayerHitTreasures);
}

function onBulletHitActor(bulletSprite, actorSprite){
  actorSprite.damage(bulletSprite.power);
  bulletSprite.kill();
}

function onPlayerHitEnemy(playerSprite, enemySprite){
  playerSprite.damage(enemySprite.power);
  if (playerSprite.health != 0){
    randomPosition(playerSprite);
  }
}

function onBulletHitEnemy(bulletSprite, enemySprite){
  // Nakama.enemys.splice(Nakama.enemys.indexOf(enemySprite), 1);
  enemySprite.kill();
  bulletSprite.kill();
  number = number - 1;
  numberText.text = 'Enemys: ' + number;
}

function onPlayerHitTreasures(playerSprite, treasureSprite) {
  if (number == 0){
    endText.text=" You win \n Enter to restart";
    endText.visible = true;
    if(Nakama.keyboard.isDown(Phaser.Keyboard.ENTER)){
      create();
    }
  }
}

function onBulletHitPlayer(bulletSprite, playerSprite){
  playerSprite.damage(bulletSprite.power);
  bulletSprite.kill();
  if (playerSprite.health != 0){
    randomPosition(playerSprite);
  }
}

function randomPosition(playerSprite){
  var i = Math.floor(Math.random()*enemyArray.length + 1);
  var a = enemyArray[i];
  playerSprite.position.x = 48 * a[1];
  playerSprite.position.y = 48 * a[0];
  timeSuper = 0;
}

var render = function(){
  // Nakama.playerGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.bodysprite);
  // });
  // Nakama.bombGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
  // Nakama.bulletGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
  // Nakama.platforms.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
  // Nakama.enemyGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
}
