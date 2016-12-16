class BulletRight extends Bullet {
  constructor(x, y, configs) {
      super(x, y, configs);
      this.sprite.body.setCircle(10, -30, 10);
  }
}
