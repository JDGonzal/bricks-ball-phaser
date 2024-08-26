export class RestartButton {
  constructor (game) {
    this.game = game;
    this.startButton = null;
  }

  preload () {
    this.game.load
      .spritesheet('button', './assets/images/restart.png', {
        frameWidth: 190, // Ancho dentro de las 2 imagenes
        frameHeight: 49, // Alto de las imágenes
      });
    this.game.load
      .audio('start-game', './assets/sounds/start-game.ogg');
  }

  create () {
    // Defino la variable `startButton`, para poner en pantalla
    this.startButton = this.game.add.sprite(400, 400, 'button')
      .setInteractive();
    // Comportamientos del `button` con el mouse
    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    // Si se presiona el `button` llama el `scene-game`
    this.startButton.on('pointerdown', () => {
      // Pongo el sonido y doy play
      this.game.sound.add('start-game').play();
      // Inicio la Escena del juego principal
      this.game.scene.start('scene-game');
    });
  }
}
