import assetsJson from '../assets.json';

export class LiveCounter {
  constructor (game, initialLives) {
    this.game = game;
    this.initialLives = initialLives;
    this.liveImages = null;
  }

  create () {
    /* para indicar la cantidad de píxeles que hay entre cada
     imagen de cada vida */
    const displacement = 30;
    /*  la posición donde se colocaría la primera imagen,
    que tengo que calcular en función del número de vidas
    a mostrar en el display, */
    const firstPosition = 800 - ((this.initialLives - 1) *
      displacement);

    const scale = assetsJson.symbols.scale;
    this.liveImages = this.game.physics.add.staticGroup({
      setScale: { x: scale, y: scale },
      key: 'hearth',
      frameQuantity: this.initialLives - 1,
      gridAlign: {
        width: this.initialLives - 1,
        height: 1,
        cellWidth: displacement,
        cellHeight: 30,
        x: firstPosition,
        y: 1,
      },
    });
    // Recorremos el `staticGroup` para mejorar la `scale`
    this.liveImages.children.each(function (partOf) {
      partOf.setScale(scale);
      partOf.setSize(partOf.displayWidth, partOf.displayHeight);
      partOf.x -= 60;
      partOf.y -= 30;
      partOf.refreshBody(); // Este siempre de último
    });
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
}
