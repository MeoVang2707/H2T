class BulletDown extends Bullet {
  constructor(x, y, configs) {
    super(x, y, configs);
    this.sprite.body.setCircle(1, -30, -25);
  }
}
