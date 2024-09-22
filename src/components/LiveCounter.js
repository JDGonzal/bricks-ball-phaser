import assetsJson from '../assets.json';
import { StaticGroupUtils } from './StaticGroupUtils';

export class LiveCounter {
  constructor (game, initialLives) {
    this.game = game;
    this.initialLives = initialLives;
    this.liveImages = null;
    /* para indicar la cantidad de píxeles que hay entre cada
     imagen de cada vida */
    this.displacement = 30;
    /* Máximo ancho de la pantalla de juegos */
    this.maxWidth = 800;
    /* Escala de la imagen de `hearth` */
    this.scale = assetsJson.symbols.scale;
  }

  create () {
    /*  la posición donde se colocaría la primera imagen,
    que tengo que calcular en función del número de vidas
    a mostrar en el display, */
    const firstPosition = this.maxWidth - ((this.initialLives - 1) *
      this.displacement);

    /* Lista de `heart` que representan las vidas */
    this.liveImages = this.game.physics.add.staticGroup({
      setScale: { x: this.scale, y: this.scale },
      key: 'hearth',
      frameQuantity: this.initialLives - 1,
      gridAlign: {
        width: this.initialLives - 1,
        height: 1,
        cellWidth: this.displacement,
        cellHeight: 30,
        x: firstPosition,
        y: 1,
      },
    });
    // Instanciamos `StaticGroupUtils`
    this.fixHearts = new StaticGroupUtils(this.liveImages);
    // Recorremos el `staticGroup` para mejorar la `scale`
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixHearts.fixStaticGroup(
      this.scale, -60, -30);
  }

  /* Cuenta las vidas disponibles y los muestra en los corazones */
  liveLost () {
    // Pongo Sonido cada que pierdo vidas
    this.game.sound.add('livelost').play();
    /* Nos permite saber el número de elementos que hay
    activos y nos permite acceder a ellos */
    if (this.liveImages.countActive() === 0) {
      // Este métodoe está en **GameScene.js**
      this.game.endGame();
      return false;
    }
    const currentLiveLost = this.liveImages.getFirstAlive();
    /* Borra la primera imagen que encuentra */
    currentLiveLost.disableBody(true, true);
    return true;
  }

  /* Incrementamos vidas y ponemos la imagen respectiva */
  addLives () {
    const targetPos = this.maxWidth - this.displacement;
    // Muevo los `hearth` una casilla a la izquierda
    this.liveImages.getChildren().forEach((item, index) => {
      item.x = item.x - this.displacement;
    });
    this.liveImages.create(targetPos, 30, 'hearth')
      .setOrigin(0.5, 1)
      .setScale(this.scale);
  }
}
