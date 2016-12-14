class Bullet {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = Nakama.bulletGroup.create(x, y , 'assets' ,'BulletType2.png');
    this.sprite.body.velocity.x = this.configs.speedX;
    this.sprite.body.velocity.y = this.configs.speedY;
    this.sprite.angle = Math.atan2(this.configs.speedX, -this.configs.speedY) * (180/Math.PI);
    this.sprite.power = 1;
  }

  update(){

  }
}
