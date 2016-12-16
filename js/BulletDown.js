class BulletDown extends Bullet {
  constructor(x, y, configs) {
    super(x, y, configs);
    this.sprite.body.setCircle(5, -25, -25);
  }
}
