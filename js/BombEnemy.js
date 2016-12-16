class BombEnemy {
  constructor(position) {
    this.sprite = Nakama.bombEnemyGroup.create(position.x + 5, position.y, "bomb");
    this.timeStart2 = 0;
    this.sprite.bombbumb = false;
    this.sprite.body.immovable = true;
    Nakama.bombsEnemy.push(this);
  }
  update(){
    this.timeStart2 += Nakama.game.time.physicsElapsed;
    if(this.timeStart2 > 1.5 || this.sprite.bombbumb){
      this.sprite.kill();
      Nakama.bombsEnemy.splice(Nakama.bombsEnemy.indexOf(this), 1);
      var bullet1 = new BulletEnemyRight(this.sprite.position.x + 60, this.sprite.position.y + 7, {speedX: Nakama.Configs.BULLET_SPEED, speedY: 0});
      var bullet2 = new BulletEnemyLeft(this.sprite.position.x - 10, this.sprite.position.y + 40,{speedX: -Nakama.Configs.BULLET_SPEED, speedY: 0});
      var bullet3 = new BulletEnemyDown(this.sprite.position.x + 35, this.sprite.position.y + 65,{speedX: 0, speedY: Nakama.Configs.BULLET_SPEED});
      var bullet4 = new BulletEnemyUp(this.sprite.position.x, this.sprite.position.y -20,{speedX: 0, speedY: -Nakama.Configs.BULLET_SPEED});
      this.timeStart2 = 0;
      this.sprite.bombbumb = false;

    }
  }
}
