class BulletUp extends Bullet {
  constructor(x, y, configs) {
      super(x, y, configs);
      this.sprite.body.setCircle(1, 17, 8);
  }
}
