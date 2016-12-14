class Enemy {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.enemyGroup.create(x, y, 'enemy');
    this.sprite.health = 1;
    this.sprite.body.setCircle(20, 5, 5);
    this.sprite.animations.add('down', [0,1,2,3], 10, true);
    this.sprite.animations.add('left', [4,5,6,7], 10, true);
    this.sprite.animations.add('up', [8,9,10,11], 10, true);
    this.sprite.animations.add('right', [12,13,14,15], 10, true);
    this.sprite.animations.add('die', [16], 10, true);
    this.sprite.power = 1;
    this.sprite.body.bounce.setTo(1,1);
    Nakama.enemys.push(this);
    this.sprite.body.velocity.setTo(0, 50);
    this.timeStart = 0;
  }

  update(){
    this.timeStart += Nakama.game.time.physicsElapsed;
    this.deltaBombx = this.sprite.position.x % 48;
    this.deltaBomby = this.sprite.position.y % 48;
    if ((this.deltaBombx < 5 || this.deltaBombx >43) && (this.deltaBomby < 5 || this.deltaBomby > 43)){
      this.deltaBomb = true;
    }
    else this.deltaBomb = false;

    if (this.timeStart > 5 && this.deltaBomb && this.sprite.alive) {
      var bomb = new BombEnemy(this.sprite.position);
      this.timeStart =0;
    }
  }
}