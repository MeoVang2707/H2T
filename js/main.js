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
// var treasure;
var stateText;

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

  stateText = Nakama.game.add.text(Nakama.game.world.centerX,Nakama.game.world.centerY,' ', { font: '84px Arial', fill: 'white' });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;

}

var update = function(){
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.platforms);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.bombGroup);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.bombEnemyGroup);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.bombGroup);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.platforms);
  Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.treasures);
  Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.treasures);


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

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.playerGroup, onBulletHitPlayer);
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitEnemy);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, onPlayerHitEnemy);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.playerGroup, onBulletHitPlayer);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.treasures, onPlayerHitTreasures);
}

function onBulletHitActor(bulletSprite, actorSprite){
  actorSprite.damage(bulletSprite.power);
  bulletSprite.kill();
}

function onPlayerHitEnemy(playerSprite, enemySprite){
  playerSprite.damage(enemySprite.power);
  stateText.text=" You loss \n Press F5 to restart";
  stateText.visible = true;
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
    stateText.text=" You win \n Press F5 to restart";
    stateText.visible = true;
  }
}

function onBulletHitPlayer(bulletSprite, playerSprite){
  playerSprite.damage(bulletSprite.power);
  bulletSprite.kill();
  stateText.text=" You loss \n Press F5 to restart";
  stateText.visible = true;
}

var render = function(){
  // Nakama.playerGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
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
