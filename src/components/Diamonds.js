export class Diamonds {
  constructor (game) {
    this.game = game;
    this.diamond = null;
  }

  // Recibimos cuatro parámetros
  create (x, y, sprite, relatedPower) {
    // Creamos un `diamond` del grupo `diamonds`
    this.diamond = this.game.physics.add
      .sprite(x, y, sprite).setScale(0.6);
    this.diamond.anims.play('bluediamondanimation');
    this.diamond.body.setAllowRotation();
    this.diamond.body.setAngularVelocity(100);
    this.diamond.body.setVelocity(100, 90);
    this.diamond.setBounce(1);
    this.diamond.setCollideWorldBounds(true);

    this.game.setBrickCollider(this.diamond);
    this.game.physics.add.collider(this.game.ball,
      this.diamond, this.ballImpact, null, this);
  }

  ballImpact (ball, diamond) {
    // Destruimos el diamante
    diamond.destroy();
    // Evitamos que se pegue
    ball.glue = false;
    /* Para evitar que la `ball` se frene con el impacto,
    la `ball` tenga siempre una velocidad vertical de 300 */
    const currentVelocity = ball.body.velocity;
    if (currentVelocity.y > 0) {
      ball.body.setVelocityY(300);
    } else {
      ball.body.setVelocityY(-300);
    }
  }
}
