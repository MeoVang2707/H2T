class BulletEnemyDown extends BulletEnemy {
  constructor(x, y, configs) {
    super(x, y, configs);
    this.sprite.body.setCircle(1, -30, -25);
  }
}
