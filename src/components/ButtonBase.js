export class ButtonBase {
  constructor (game, image, x, y) {
    this.game = game;
    this.image = image;
    this.x = x;
    this.y = y;
  }

  create () {
    // Defino la variable `startButton`, para poner en pantalla
    this.startButton = this.game.add.sprite(this.x, this.y,
      this.image).setInteractive();
    // Comportamientos del `button` con el mouse
    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    // Si se presiona el `button` llama un `doClick`
    this.startButton.on('pointerdown', () => {
      // Llamo lo q está en `RestartButton`
      this.doClick();
    });
  }
}
