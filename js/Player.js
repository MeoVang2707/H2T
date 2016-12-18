class Player {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.playerGroup.create(48,48, "player");
    this.sprite.health = 5;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setCircle(24, 0.5, 0.5);
    this.sprite.animations.add('down', [0,1,2,3], 10, true);
    this.sprite.animations.add('left', [4,5,6,7], 10, true);
    this.sprite.animations.add('up', [8,9,10,11], 10, true);
    this.sprite.animations.add('right', [12,13,14,15], 10, true);
    this.sprite.animations.add('die', [16], 10, true);
    this.deltaTime = 0;
  }

  update(){
    if (Nakama.eatBoot == true){
      playerSpeed = 200;
    }
    else {
      playerSpeed = 100;
    }
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -playerSpeed;
      this.sprite.animations.play('up');
      beginText.visible = false;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = playerSpeed;
      this.sprite.animations.play('down');
      beginText.visible = false;
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -playerSpeed;
      this.sprite.animations.play('left');
      beginText.visible = false;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = playerSpeed;
      this.sprite.animations.play('right');
      beginText.visible = false;
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

    this.deltaTime += Nakama.game.time.physicsElapsed;
    if (Nakama.eatBomb == true){
      if (Nakama.keyboard.isDown(this.configs.fire) && numberBomb <= 1 && this.deltaBomb && this.deltaTime > 0.3) {
        this.fire();
        this.deltaTime = 0;
      }
    }
    else {
      if (Nakama.keyboard.isDown(this.configs.fire) && numberBomb == 0 && this.deltaBomb) {
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
