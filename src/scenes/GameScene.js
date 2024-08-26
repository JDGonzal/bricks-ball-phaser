import Phaser from 'phaser';
import assetsJson from '../assets.json'; // assert { type: 'json' };
import { Scoreboard } from '../components/Scoreboard.js';
import { preloadFromJson /*, createFromJson */ } from '../components/jsonUtils.js';

const BRICKS_BY_COLOR = 10;

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
  }

  /* Valores que puedo inicializar */
  init () {
    this.scoreboard = new Scoreboard(this);
  }

  preload () {
    /* Precargamos los archivos de imagenes */
    this.load.image('background', './assets/background.png');

    preloadFromJson(this, assetsJson.bricks);
    preloadFromJson(this, assetsJson.boxes);
    preloadFromJson(this, assetsJson.platforms);
    preloadFromJson(this, assetsJson.symbols);
  }

  create () {
    /* Definimos los límites del `world` para que la `ball`
    pueda rebotar: ---------------------> izq., der., arr., aba. */
    this.physics.world.setBoundsCollision(true, true, true, false);

    /* Ponemos las imágenes en el juego */
    this.background =
      this.add.image(0, 0, 'background')
        .setOrigin(0, 0);

    // Definimos la variable `staticGroup`
    // this.bricks = this.physics.add.staticGroup();
    // this.bricks.create(254, 244, 'brick-blue')
    //   .setScale(assetsJson.bricks.scale).refreshBody();
    // this.bricks.create(375, 232, 'brick-green')
    //   .setScale(assetsJson.bricks.scale).refreshBody();
    this.bricks = this.physics.add.staticGroup({
      key: ['brick-blue', 'brick-orange', 'brick-green', 'brick-yellow'],
      frameQuantity: BRICKS_BY_COLOR,
      // scale: assetsJson.bricks.scale,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
        x: 112,
        y: 20,
      },
    });
    /* Añado un recorrido de los `children` del grupo de
    nombre `bricks` para ajustar: `scale`, `size` y
    posición `x` */
    this.bricks.children.each(function (partOf) {
      partOf.setScale(assetsJson.bricks.scale);
      partOf.setSize(partOf.displayWidth, partOf.displayHeight);
      partOf.x -= 112 + 85;
      partOf.setOrigin(0.5, 1);
      partOf.refreshBody(); // Este siempre de último
    });

    // Si quiero ver en pantalla lo del json
    /*
    let y = 0;
    y = createFromJson(this, assetsJson.bricks, 0, y) + 26;
    y = createFromJson(this, assetsJson.boxes, 0, y) + 26;
    y = createFromJson(this, assetsJson.platforms, 0, y) + 26;
    createFromJson(this, assetsJson.symbols, 0, y);
    /* */

    // Invomcamos el `create` del componente `Scoreboard`
    this.scoreboard.create();

    // Ponemos la `ball` con las `physics`
    this.ball =
      this.physics.add.image(400, 449, 'ball')
        .setScale(assetsJson.symbols.scale)
        .setOrigin(0.5, 1);
    // Añado a `ball` el valor de `glue`
    this.ball.glue = true;
    /* Luego de crearla le decimos que se adapte a los límites
     del `world` */
    this.ball.setCollideWorldBounds(true);
    // Mostramos la `platform-normal` con physics
    this.platform =
      this.physics.add.image(400, 450, 'platform-normal')
        .setScale(assetsJson.platforms.scale)
        .setOrigin(0.5, 0);
    // Como la plataforma cae le decimos q no va a tener gravedad
    this.platform.body.allowGravity = false;
    // La velocidad(x,y) de la `ball` será aleatoria
    // let velocity = 100 * Phaser.Math.Between(1.3, 2);
    // if (Phaser.Math.Between(0, 10) > 5) {
    //   velocity = 0 - velocity;
    // }
    // this.ball.setVelocity(velocity, 10);

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
  }

  /* Método para cuando se hace la colisión entre
  la `ball` y la `platform` */
  platformImpact (ball, platform) {
    // Llamo la función de **Scoreboard.js**
    this.scoreboard.addPoints(1);
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
    /* con el método `countActive` sabremos cuantos `bricks`
    nos quedan disponibles */
    if (this.bricks.countActive() === 0) {
      // Llamada a la escena q tiene el `congratulations`
      this.scene.start('scene-congratulations');
    }
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
    if (this.platform.y - this.ball.y <= 1 && this.ball.glue) {
      this.ball.setVelocityX(this.platform.body.velocity.x);
      /* Salta la `ball` si está en contacto con la `platform` */
      if (this.cursor.space.isDown || this.cursor.up.isDown) {
        this.ball.setVelocity(Phaser.Math.Between(-20, 20), -300);
        this.ball.glue = false;
      }
    }

    // Si la `ball` se sale del juego se da por terminado el juego
    if (this.ball.y >= 500 + this.ball.body.height) {
      console.log('GameOver');
      // Llamada a la escena q tiene el `gameover`
      this.scene.start('scene-game-over');
    }
  }
};
