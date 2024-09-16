export class PowerBase {
  constructor (game, diamonds, powerSprite) {
    this.game = game;
    this.powerSprite = powerSprite;
    this.diamonds = diamonds;
  }

  create (x, y) {
    // Llamamos el método `create`
    this.diamonds.create(x, y, this.powerSprite, this);
  }

  givePower () {
    console.log('Definition of Power');
  }
}
