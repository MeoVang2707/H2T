class Player {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.playerGroup.create(48,48, "player");
    this.sprite.health = 3;
    this.sprite.body.setCircle(22, 0, 0);
    this.sprite.animations.add('down', [0,1,2,3], 10, true);
    this.sprite.animations.add('left', [4,5,6,7], 10, true);
    this.sprite.animations.add('up', [8,9,10,11], 10, true);
    this.sprite.animations.add('right', [12,13,14,15], 10, true);
    this.sprite.animations.add('die', [16], 10, true);
  }

  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -200;
      this.sprite.animations.play('up')
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = 200;
      this.sprite.animations.play('down')
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -200;
      this.sprite.animations.play('left')
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = 200;
      this.sprite.animations.play('right')
    }
    else{
      this.sprite.body.velocity.x = 0;
      this.sprite.animations.stop();
    }

    this.deltaBombx = this.sprite.position.x % 48;
    this.deltaBomby = this.sprite.position.y % 48;
    if ((this.deltaBombx < 5 || this.deltaBombx >43) && (this.deltaBomby < 5 || this.deltaBomby > 43)){
      this.deltaBomb = true;
    }
    else this.deltaBomb = false;

    if (Nakama.keyboard.isDown(this.configs.fire) && Nakama.bombsPlayer.length == 0 && this.deltaBomb) {
      this.fire();
    }
  }

  fire(){
    var bomb = new Bomb(this.sprite.position);
  }
}
