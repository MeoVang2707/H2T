class BulletUp extends Bullet {
  constructor(x, y, configs) {
      super(x, y, configs);
      this.sprite.body.setCircle(10, 8, 10);
  }
}
