import { Diamonds } from '../Diamonds.js';

export class PowerBase {
  constructor (game, powerSprite) {
    this.game = game;
    this.powerSprite = powerSprite;
  }

  create (x, y) {
    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    // Llamamos el método `create`
    this.diamonds.create(x, y, this.powerSprite);
  }
}
