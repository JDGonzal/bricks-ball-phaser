import assetsJson from '../assets.json'; // assert { type: 'json' };

export class Ball {
  constructor (game) {
    this.game = game;
    this.isGlued = true;
  }

  create () {
    // Ponemos la `ball` con las `physics`
    this.ball =
        this.game.physics.add.image(400, 449, 'ball')
          .setOrigin(0.5, 1)
          .setScale(assetsJson.symbols.scale);
    // Hacemos un rebote de la `ball`
    this.ball.setBounce(1);
    /* Luego de crearla le decimos que se adapte a los límites
     del `world` */
    this.ball.setCollideWorldBounds(true);
  }

  isLost () {
    return (this.ball.y >= 500 + this.ball.body.height &&
      !this.ball.isGlue && this.ball.active);
  }

  get () {
    return this.ball;
  }

  throw (velocity) {
    this.ball.setVelocity(velocity, -300);
    this.isGluedd = false;
  }

  removeGlue () {
    this.isGlued = false;
  }
}
