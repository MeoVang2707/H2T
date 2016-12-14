class BulletEnemyUp extends BulletEnemy {
  constructor(x, y, configs) {
      super(x, y, configs);
      this.sprite.body.setCircle(1, 8, 10);
  }
}
