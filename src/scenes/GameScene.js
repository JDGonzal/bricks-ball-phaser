import Phaser from 'phaser';

import { Scoreboard } from '../components/Scoreboard.js';

import { LiveCounter } from '../components/LiveCounter.js';
import { LevelConstructor } from '../components/levels/Level-Constructor.js';
import { Platform } from '../components/Platform.js';
import { Ball } from '../components/Ball.js';

const INITIAL_VELOCITY_X = -60;
const INITIAL_LIVES = 10;

/* Se exporta la clase a usar de la Escena */
export class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game' });

    this.background = null;
    this.platform = null;
    this.cursors = null;
    this.ball = null;
    this.scoreboard = null;
    this.bricks = null;
    this.liveCounter = null;
    this.levelConstructor = null;
    this.diamondBlue = null;
    this.glueRecordVelocityX = INITIAL_VELOCITY_X;
    this.joyStick = null;
    this.joystickCursors = null;
  }

  /* Valores que puedo inicializar */
  init () {
    // instancio el `LevelConstructor`
    this.levelConstructor = new LevelConstructor(this);
    // Instancio el `Platform`
    this.platform = new Platform(this);
    // Instancio de `Ball`
    this.ball = new Ball(this);
    // instancio el `Scoreboard`
    this.scoreboard = new Scoreboard(this);
    // instancio el `LiveCounter`
    this.liveCounter = new LiveCounter(this, INITIAL_LIVES);
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

    // Invocamos el `create` del componente `Ball`
    this.ball.create();

    // Invocamos el `create` del componente `Platform`
    this.platform.create();

    // Invoco el create del constructor de niveles
    this.levelConstructor.create();

    // Colisión entre la `platform` y la `ball`
    this.physics.add.collider(
      this.ball.get(),
      this.platform.get(),
      /* Comportamiento, Callback, Contexto */
      this.platformImpact, null, this);
    // this.platformImpact.bind(this), null); // otra forma

    // Esto sobra ya q es de **LevelBase.js**
    // this.physics.add.collider(this.ball.get(), this.bricks,
    //   /* Comportamiento, Callback, Contexto */
    //   this.bricksImpact, null, this);

    // Creamos el manejo de teclado para mover la `platform`
    this.cursors = this.input.keyboard.createCursorKeys();

    // Llamo el método para ver las animaciones de los `diamonds`
    this.createAnimations();

    // Activación del `joyStick` con los parámetros
    this.joyStick =
      this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 55,
        y: 400,
        radius: 100,
        base: this.add.circle(0, 0, 50, 0x888888),
        thumb: this.add.circle(0, 0, 25, 0xcccccc),
      // dir: '8dir',
      // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
      });
    // El manejo del teclado pero en un `joyStick`
    this.joystickCursors = this.joyStick.createCursorKeys();
  }

  /* Método para cuando se hace la colisión entre
  la `ball` y la `platform` */
  platformImpact (ball, platform) {
    // Si esta en estado `glue` simplemente se sale
    if (this.ball.isGlued || ball.body.velocity.y === 0) return;
    // Llamo la función de **Scoreboard.js**
    if (ball.body.velocity.y > 0) {
      this.scoreboard.addPoints(1);
    }
    // Pongo el sonido y doy play
    this.sound.add('platform-impact').play();
    /* Los comportamientos entre la `ball` y la `platform`
    obteniendo la posición relativa entre estos */
    const relativeImpact = ball.x - platform.x;

    if (this.platform.hasGluePower()) {
      ball.setVelocityY(0);
      ball.setVelocityX(0);
      // Guardamos la velocidad antes de lanzarla
      this.glueRecordVelocityX =
        this.calculateVelocity(relativeImpact);
      this.platform.hasBallGlued = true;
    } else {
      ball.setVelocityX(
        this.calculateVelocity(relativeImpact));
    }
  }

  calculateVelocity (relativeImpact) {
    console.log(relativeImpact);
    // se añade condición si el valor esta muy en el centro
    if (relativeImpact <= 1 && relativeImpact >= -1) {
      return (Phaser.Math.Between(-20, 20));
    } else {
      // Cambia la velociad de X en función a este valor
      return (Phaser.Math.Between(6, 10) * relativeImpact);
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
      this.platform.setInitialState(this.ball);
    }
  }

  /* Esto es llamado de **LevelXX.js** */
  unbreakableBricksImpact (ball, unbreakableBricks) {
    this.sound.add('unbreakable-impact').play();
  }

  update () {
    /* El proceso corre cada segundo */
    // Llamada al método con el control de las teclas y bola
    this.platform.updatePosition(this.ball, this.cursors,
      this.joystickCursors);

    /* Salta la `ball` si está en contacto con la `platform` */
    if (this.cursors.space.isDown ||
      this.cursors.up.isDown ||
      this.joystickCursors.up.isDown) {
      if (this.ball.isGlued) {
        this.ball.get().setVelocity(Phaser.Math.Between(-20, 20), -300);
        this.ball.isGlued = false;
      } else if (this.platform.hasGluePower() &&
        this.platform.hasBallGlued) {
        this.platform.hasBallGlued = false;
        this.ball.get().setVelocity(this.glueRecordVelocityX, -300);
      } else if (this.platform.isGluedBecausePower()) {
        this.ball.throw(this.glueRecordVelocityX);
        this.platform.hasBallGlued = false;
      }
    }

    // Si la `ball` se sale del juego se da por terminado el juego
    if (this.ball.isLost()) {
      const gameNotFinished = this.liveCounter.liveLost();
      if (gameNotFinished) {
        this.platform.setInitialState(this.ball);
        this.platform.setPlatformInitial();
        this.platform.removeGlue();
        this.glueRecordVelocityX = INITIAL_VELOCITY_X;
      }
    }
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
    this.anims.create({
      key: 'greendiamondanimation',
      frames: this.anims
        .generateFrameNumbers('greendiamond', {
          start: 0, end: 7,
        }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  addLives () {
    this.liveCounter.addLives();
  }

  setGluePower () {
    this.platform.setGluePower();
  }

  setPlatformBig () {
    this.platform.setPlatformBig();
  }

  removeGlueFromBall () {
    this.ball.removeGlue();
  }
};
