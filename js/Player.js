class Player {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.playerGroup.create(48,48, "player");
    this.sprite.health = 1000;
    this.sprite.body.setCircle(24, 0.5, 0.5);
    this.sprite.animations.add('down', [0,1,2,3], 10, true);
    this.sprite.animations.add('left', [4,5,6,7], 10, true);
    this.sprite.animations.add('up', [8,9,10,11], 10, true);
    this.sprite.animations.add('right', [12,13,14,15], 10, true);
    this.sprite.animations.add('die', [16], 10, true);
  }

  update(){
    if (eatBoot == true){
      playerSpeed = 200;
    }
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -playerSpeed;
      this.sprite.animations.play('up')
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = playerSpeed;
      this.sprite.animations.play('down')
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -playerSpeed;
      this.sprite.animations.play('left')
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = playerSpeed;
      this.sprite.animations.play('right')
    }
    else{
      this.sprite.body.velocity.x = 0;
      this.sprite.animations.stop();
    }

    this.deltaBombx = this.sprite.position.x % 48;
    this.deltaBomby = this.sprite.position.y % 48;
    if ((this.deltaBombx < 20 || this.deltaBombx >25) && (this.deltaBomby < 20 || this.deltaBomby > 25)){
      this.deltaBomb = true;
    }
    else this.deltaBomb = false;

    if (eatBomb == true){
      console.log('aaaaa');
      if ((Nakama.keyboard.isDown(this.configs.fire)) && Nakama.bombsPlayer.length <= 6 && this.deltaBomb) {
        console.log('b');
        this.fire();
      }
    }
    else {
      if (Nakama.keyboard.isDown(this.configs.fire) && Nakama.bombsPlayer.length == 0 && this.deltaBomb) {
        console.log('c');
        this.fire();
      }
    }
  }

  fire(){
    if(this.deltaBombx < 20 && this.deltaBomby < 25){
      var bomb = new Bomb(this.sprite.position.x - this.deltaBombx, this.sprite.position.y - this.deltaBomby );
    }
    else if(this.deltaBombx < 20 && this.deltaBomby > 25){
      var bomb = new Bomb(this.sprite.position.x - this.deltaBombx, this.sprite.position.y + 48 - this.deltaBomby );
    }
    else if(this.deltaBombx > 20 && this.deltaBomby < 25){
      var bomb = new Bomb(this.sprite.position.x + 48 - this.deltaBombx, this.sprite.position.y - this.deltaBomby );
    }
    else if(this.deltaBombx > 20 && this.deltaBomby > 25){
      var bomb = new Bomb(this.sprite.position.x + 48 - this.deltaBombx, this.sprite.position.y + 48 - this.deltaBomby );
    }
  }
}
