import { Math } from 'phaser';
export class Diamonds {
  constructor (game) {
    this.game = game;
    this.diamonds = this.game.physics.add.group();
    this.game.physics.add.collider(this.game.ball.get(),
      this.diamonds,
      this.ballImpact, null, this);
    this.game.physics.add.collider(this.game.platform.get(),
      this.diamonds,
      this.platformImpact, null, this);
  }

  // Recibimos cuatro parámetros
  create (x, y, sprite, relatedPower) {
    // Creamos un `diamond` del grupo `diamonds`
    const diamond = this.diamonds.create(x, y, sprite);
    diamond.relatedPower = relatedPower;
    diamond.setScale(0.6);
    diamond.anims.play(sprite + 'animation');
    diamond.body.setAllowRotation();
    diamond.body.setAngularVelocity(100);
    diamond.body.setVelocity(
      Math.Between(-100, 100),
      Math.Between(-100, 100),
    );
    diamond.setBounce(1);
    diamond.setCollideWorldBounds(true);
  }

  ballImpact (ball, diamond) {
    // Destruimos el diamante
    diamond.destroy();
    // damos el poder q se relacione
    diamond.relatedPower.givePower();
    /* Para evitar que la `ball` se frene con el impacto,
    la `ball` tenga siempre una velocidad vertical de 300 */
    const currentVelocity = ball.body.velocity;
    if (currentVelocity.y > 0 && !this.game.ball.isGlued) {
      ball.body.setVelocityY(300);
    } else {
      ball.body.setVelocityY(-300);
    }
    // Evitamos que se pegue, proviene de **GameScene.js**
    this.game.removeGlueFromBall();
  }

  platformImpact (platform, diamond) {
    // Destruimos el diamante
    diamond.destroy();
    // damos el poder q se relacione
    diamond.relatedPower.givePower();
    if (this.game.ball.get().isGlued) {
      this.game.ball.get().body.setVelocityY(-300);
    }
  }
}
