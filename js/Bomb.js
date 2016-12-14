class Bomb {
  constructor(position) {
    this.sprite = Nakama.bombGroup.create(position.x + 5, position.y, "bomb");
    Nakama.bombsPlayer.push(this);
    this.timeStart = 0;
    this.sprite.body.immovable = true;
  }
  update(){
    this.timeStart += Nakama.game.time.physicsElapsed;
    if(this.timeStart > 1.5){
      this.sprite.kill();
      this.timeStart = 0;
      Nakama.bombsPlayer.splice(Nakama.bombsPlayer.indexOf(this), 1);
      var bullet1 = new BulletRight(this.sprite.position.x + 60, this.sprite.position.y + 7, {speedX: Nakama.Configs.BULLET_SPEED, speedY: 0});
      var bullet2 = new BulletLeft(this.sprite.position.x - 10, this.sprite.position.y + 40,{speedX: -Nakama.Configs.BULLET_SPEED, speedY: 0});
      var bullet3 = new BulletDown(this.sprite.position.x + 35, this.sprite.position.y + 65,{speedX: 0, speedY: Nakama.Configs.BULLET_SPEED});
      var bullet4 = new BulletUp(this.sprite.position.x, this.sprite.position.y -20,{speedX: 0, speedY: -Nakama.Configs.BULLET_SPEED});
    }
  }
}
