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
  Nakama.game.load.image('itemBullet', 'Assets/itemBullet.jpg');
  Nakama.game.load.image('treasure', 'Assets/treasure.png');
  Nakama.game.time.advancedTiming = true;
  Nakama.game.load.image('bomb', 'Assets/bomb.png');
  Nakama.game.load.image('itemBoot', 'Assets/itemBoot.jpg');
  Nakama.game.load.image('itemBomb', 'Assets/itemBomb.jpg');
}

var numberBomb =1;
var number;
var numberText = 0;
var health;
var healthText;
var endText;
var timeSuper = 0;
var enemyArray= [];
var stoneArray = [];
var eatIteam = false;
var eatBoot = false;
var eatBomb = false;
var playerSpeed = 100;
var timeLight = 0;

var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.game.add.sprite(0, 0, "background");

  Nakama.itemBombGroup = Nakama.game.add.physicsGroup();
  Nakama.itemBootGroup = Nakama.game.add.physicsGroup();
  Nakama.itemGroup = Nakama.game.add.physicsGroup();
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
  Nakama.items = [];

  var map1 = new Map();

  var i = Math.floor(Math.random()*stoneArray.length + 1);
  var a = stoneArray[i];
  itemBullet = Nakama.itemGroup.create(48 * a[1], 48 * a[0], 'itemBullet');

  var i = Math.floor(Math.random()*stoneArray.length + 1);
  var a = stoneArray[i];
  itemBoot = Nakama.itemBootGroup.create(48 * a[1], 48 * a[0], 'itemBoot');

  var i = Math.floor(Math.random()*stoneArray.length + 1);
  var a = stoneArray[i];
  itemBomb = Nakama.itemBombGroup.create(48 * a[1], 48 * a[0], 'itemBomb');

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
  timeLight +=  Nakama.game.time.physicsElapsed;

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

  if (timeSuper >= 3){
    Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, onPlayerHitEnemy);
    Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.playerGroup, onBulletHitPlayer);
    Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.playerGroup, onBulletHitPlayer);
  }
  else {
    Nakama.players[0].sprite.tint = 0xff00ff;
    setTimeout(function(){
      Nakama.players[0].sprite.tint = 0xffffff;
    }.bind(this), 200);

  }
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitEnemy);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.platforms, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.treasures, onPlayerHitTreasures);
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.bombEnemyGroup, onBulletHitBomb);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.bombEnemyGroup, onBulletHitBomb);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.itemGroup, onPlayerHitItem);
  Nakama.game.physics.arcade.overlap(Nakama.bulletEnemyGroup, Nakama.bombGroup, onBulletHitBomb);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.itemBootGroup, onPlayerHitItemBoot);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.itemBombGroup, onPlayerHitItemBomb);
}

function onPlayerHitItemBomb(playerSprite, itemSprite){
  itemSprite.kill();
  eatBomb = true;
}

function onPlayerHitItemBoot(playerSprite, itemSprite){
  itemSprite.kill();
  eatBoot = true;
}

function onPlayerHitItem(playerSprite, itemSprite){
  itemSprite.kill();
  eatIteam = true;
}

function onBulletHitBomb(bulletSprite, bombSprite){
  bulletSprite.kill();
  bombSprite.bombbumb = true;
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
    // Nakama.game.time.events.loop(Phaser.Timer.SECOND * 0.1, changeTint, this);
    // for (var i = 0; i <5; i++) {
    //   playerSprite.tint = 0xff00ff;
    // }

    // playerSprite.alpha = 0.1;
    // var tween = Nakama.game.add.tween(playerSprite).to( { alpha: 1 }, 20, "Linear", true, 20);
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
