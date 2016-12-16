class Bomb {
  constructor(x, y) {
    this.sprite = Nakama.bombGroup.create(x, y, "bomb");
    Nakama.bombsPlayer.push(this);
    this.sprite.bombbumb = false;
    this.timeStart = 0;
    this.deltaTime = 0;
    this.sprite.body.immovable = true;
  }
  update(){
    this.timeStart += Nakama.game.time.physicsElapsed;
    if(this.timeStart > 1.5 || this.sprite.bombbumb){
      this.sprite.kill();
      Nakama.bombsPlayer.splice(Nakama.bombsPlayer.indexOf(this), 1);
      this.bullet();
      if (eatIteam == true){
        setTimeout(function(){
          this.bullet();
        }.bind(this), 200);
      }
      this.timeStart = 0;
    }
  }

  bullet(){
    var bullet1 = new BulletRight(this.sprite.position.x + 60, this.sprite.position.y + 7, {speedX: Nakama.Configs.BULLET_SPEED, speedY: 0});
    var bullet2 = new BulletLeft(this.sprite.position.x - 10, this.sprite.position.y + 43,{speedX: -Nakama.Configs.BULLET_SPEED, speedY: 0});
    var bullet3 = new BulletDown(this.sprite.position.x + 45, this.sprite.position.y + 65,{speedX: 0, speedY: Nakama.Configs.BULLET_SPEED});
    var bullet4 = new BulletUp(this.sprite.position.x + 5, this.sprite.position.y -20,{speedX: 0, speedY: -Nakama.Configs.BULLET_SPEED});
  }
}
