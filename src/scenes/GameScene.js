import Phaser from 'phaser';
import assetsJson from '../assets.json'; // assert { type: 'json' };
import { Scoreboard } from '../components/Scoreboard.js';

import { LiveCounter } from '../components/LiveCounter.js';
import { LevelConstructor } from '../components/Level-Constructor.js';

/* Se exporta la clase a usar de la Escena */
export class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game' });

    this.background = null;
    this.platform = null;
    this.cursor = null;
    this.ball = null;
    this.scoreboard = null;
    this.bricks = null;
    this.liveCounter = null;
    this.levelConstructor = null;
    this.diamondBlue = null;
  }

  /* Valores que puedo inicializar */
  init () {
    // instancio el `LevelConstructor`
    this.levelConstructor = new LevelConstructor(this);
    // instancio el `Scoreboard`
    this.scoreboard = new Scoreboard(this);
    // instancio el `LiveCounter`
    this.liveCounter = new LiveCounter(this, 3);
  }

  create () {
    /* Definimos los límites del `world` para que la `ball`
    pueda rebotar: ---------------------> izq., der., arr., aba. */
    this.physics.world.setBoundsCollision(true, true, true, false);

    /* Ponemos las imágenes en el juego */
    this.background =
      this.add.image(0, 0, 'background')
        .setOrigin(0, 0);

    // Si quiero ver en pantalla lo del json
    /*
    let y = 0;
    y = createFromJson(this, assetsJson.bricks, 0, y) + 26;
    y = createFromJson(this, assetsJson.boxes, 0, y) + 26;
    y = createFromJson(this, assetsJson.platforms, 0, y) + 26;
    createFromJson(this, assetsJson.symbols, 0, y);
    /* */

    // Invocamos el `create` del componente `Scoreboard`
    this.scoreboard.create();
    // Invocamos el `create` del componente `LiveCounter`
    this.liveCounter.create();

    // Ponemos la `ball` con las `physics`
    this.ball =
      this.physics.add.image(400, 449, 'ball')
        .setOrigin(0.5, 1)
        .setScale(assetsJson.symbols.scale);
    // Añado a `ball` el valor de `glue`
    this.ball.glue = true;
    /* Luego de crearla le decimos que se adapte a los límites
     del `world` */
    this.ball.setCollideWorldBounds(true);
    // Mostramos la `platform-normal` con physics
    this.platform =
      this.physics.add.image(400, 450, 'platform-normal')
        .setOrigin(0.5, 0)
        .setScale(assetsJson.platforms.scale);
    // Como la plataforma cae le decimos q no va a tener gravedad
    this.platform.body.allowGravity = false;
    // La velocidad(x,y) de la `ball` será aleatoria
    // let velocity = 100 * Phaser.Math.Between(1.3, 2);
    // if (Phaser.Math.Between(0, 10) > 5) {
    //   velocity = 0 - velocity;
    // }
    // this.ball.setVelocity(velocity, 10);

    // Invoco el create del constructor de niveles
    this.levelConstructor.create();

    // Colisión entre la `platform` y la `ball`
    this.physics.add.collider(this.ball, this.platform,
      /* Comportamiento, Callback, Contexto */
      this.platformImpact, null, this);
    // this.platformImpact.bind(this), null); // otra forma

    // Colisión entre la `ball` y el grupo de `bricks`
    this.physics.add.collider(this.ball, this.bricks,
      /* Comportamiento, Callback, Contexto */
      this.bricksImpact, null, this);

    // Hacemos un rebote de la `ball`
    this.ball.setBounce(1);
    // La plata forma la hacemos inmovible
    this.platform.setImmovable();

    // Creamos el manejo de teclado para mover la `platform`
    this.cursor = this.input.keyboard.createCursorKeys();

    // Llamo el método para ver las animaciones de los `diamonds`
    this.createAnimations();
  }

  /* Método para cuando se hace la colisión entre
  la `ball` y la `platform` */
  platformImpact (ball, platform) {
    // Si esta en estado `glue` simplemente se sale
    if (this.ball.glue) return;
    // Llamo la función de **Scoreboard.js**
    this.scoreboard.addPoints(1);
    // Pongo el sonido y doy play
    this.sound.add('platform-impact').play();
    /* Los comportamientos entre la `ball` y la `platform`
    obteniendo la posición relativa entre estos */
    const relativeImpact = ball.x - platform.x;
    console.log(relativeImpact);
    // se añade condición si el valor esta muy en el centro
    if (relativeImpact <= 1 && relativeImpact >= -1) {
      ball.setVelocityX(Phaser.Math.Between(-20, 20));
    } else {
      // Cambia la velociad de X en función a este valor
      ball.setVelocityX(Phaser.Math.Between(6, 10) *
        relativeImpact);
    }
  }

  /* Método para cuando se hace la colisión entre
  la `ball` y los `bricks` */
  bricksImpact (ball, brick) {
    // Desaparecemos el ladrillo q fué impactado
    brick.disableBody(true, true);
    // Llamo la función de **Scoreboard.js**
    this.scoreboard.addPoints(10);
    // Pongo el sonido y doy play
    this.sound.add('brick-impact').play();
    /* Verifica en el `levelConstructor` para seguir otro nivel */
    if (this.levelConstructor.isLevelFinished()) {
      this.sound.add('level-change').play();
      this.levelConstructor.nextLevel();
      this.setInitialPlatformState();
    }
  }

  /* Esto es llamado de **LevelXX.js** */
  unbreakableBricksImpact (ball, unbreakableBricks) {
    this.sound.add('unbreakable-impact').play();
  }

  update () {
    /* El proceso corre cada segundo */
    // Definimos q hace cada tecla
    if (this.cursor.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (this.cursor.right.isDown) {
      this.platform.setVelocityX(500);
    } else this.platform.setVelocityX(0);

    /* Asociamos la velocidad de la `ball` a la `platform`
    cuando la `ball` esté muy cerquita de la `platform` */
    if (this.platform.y - this.ball.y <= 10 && this.ball.glue) {
      this.ball.setVelocityX(this.platform.body.velocity.x);
      /* Salta la `ball` si está en contacto con la `platform` */
      if (this.cursor.space.isDown || this.cursor.up.isDown) {
        this.ball.setVelocity(Phaser.Math.Between(-20, 20), -300);
        this.ball.glue = false;
      }
    }

    // Si la `ball` se sale del juego se da por terminado el juego
    if (this.ball.y >= 500 + this.ball.body.height &&
      !this.ball.glue) {
      const gameNotFinished = this.liveCounter.liveLost();
      if (gameNotFinished) {
        this.setInitialPlatformState();
      }
    }
  }

  setInitialPlatformState () {
    this.ball.setVelocity(0, 0)
      .setPosition(400, 449)
      .setOrigin(0.5, 1);
    this.ball.glue = true;
    this.platform.setVelocity(0, 0)
      .setPosition(400, 450)
      .setOrigin(0.5, 0);
  }

  endGame (completed = false) {
    if (!completed) {
      this.scene.start('scene-game-over');
    } else {
      this.scene.start('scene-congratulations');
    }
  }

  setBrickCollider (elementX) {
    this.levelConstructor.setBrickCollider(elementX);
  }

  createAnimations () {
    this.anims.create({
      key: 'bluediamondanimation',
      frames: this.anims
        .generateFrameNumbers('bluediamond', {
          start: 0, end: 7,
        }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'reddiamondanimation',
      frames: this.anims
        .generateFrameNumbers('reddiamond', {
          start: 0, end: 7,
        }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  addLives (num) {
    this.liveCounter.addLives(num);
  }
};
