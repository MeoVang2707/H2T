class EnemyType2 {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.enemy2Group.create(x, y, 'enemy');
    this.sprite.health = 1;
    this.sprite.body.setCircle(20, 5, 5);
    this.sprite.power = 1;
    // this.sprite.body.bounce.setTo(1,1);
    Nakama.enemys.push(this);
    // this.sprite.body.velocity.setTo(0, 50);
    this.timeStart = 0;
    this.sprite.tint = 0xff000f;
  }

  update(){
    this.target = Nakama.players[0];
    this.sprite.body.velocity = Phaser.Point.subtract(
      this.target.sprite.position,
      this.sprite.position
    ).setMagnitude(30);
  }

}
