import assetsJson from '../assets.json'; // assert { type: 'json' };

const PLATFORM_SIZE_NORMAL = { width: 488, height: 128 };
const PLATFORM_SIZE_BIG = { width: 693, height: 128 };
const PLATFORM_SCALE = assetsJson.platforms.scale;
const PLATFORM_TEXTURE_NORMAL = 'platform-normal';
const PLATFORM_TEXTURE_BIG = 'platform-electric-long';
export class Platform {
  constructor (game) {
    this.game = game;
    this.gluePower = false;
    this.hasBallGlued = false;
  }

  create () {
    // Mostramos la `platform-normal` con physics
    this.platform =
        this.game.physics.add.image(400, 450,
          PLATFORM_TEXTURE_NORMAL)
          .setOrigin(0.5, 0) // x=la mitad y=Top
          .setScale(PLATFORM_SCALE) // La escala en pantalla
          .setImmovable(); // La plata forma la hacemos inmovible
    // Como la plataforma cae le decimos q no va a tener gravedad
    this.platform.body.allowGravity = false;
  }

  hasGluePower () {
    return this.gluePower;
  }

  updatePosition (ball, cursors) {
    // Definimos q hace cada tecla
    if (cursors.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (cursors.right.isDown) {
      this.platform.setVelocityX(500);
    } else {
      this.platform.setVelocityX(0);
    }
    /* Asociamos la velocidad de la `ball` a la `platform`
    cuando la `ball` esté muy cerquita de la `platform` */
    if (ball.glue || this.hasBallGlued) {
      ball.setVelocityX(this.platform.body.velocity.x);
    }
  }

  setInitialState (ball) {
    ball.glue = true;
    this.platform.setVelocity(0, 0)
      .setPosition(400, 450)
      .setOrigin(0.5, 0);
    ball.setVelocity(0, 0)
      .setPosition(400, 449)
      .setOrigin(0.5, 1);
  }

  setPlatformTexture (texture, size = PLATFORM_SIZE_NORMAL) {
    const { width, height } = size;
    const scale = PLATFORM_SCALE;
    // this.game.physics.world.pause();
    // this.game.anims.pauseAll();
    this.platform.setTexture(texture);
    this.platform.setDisplaySize(width * scale, height * scale);
    this.platform.body.setSize(width, height);
    // this.game.physics.world.resume();
    // this.game.anims.resumeAll();
  }

  setPlatformBig () {
    this.setPlatformTexture(PLATFORM_TEXTURE_BIG,
      PLATFORM_SIZE_BIG);
    this.gluePower = false;
  }

  setPlatformInitial () {
    this.setPlatformTexture(PLATFORM_TEXTURE_NORMAL);
  }

  removeGlue () {
    this.gluePower = false;
  }

  setGluePower () {
    this.setPlatformInitial();
    this.gluePower = true;
  }
}
