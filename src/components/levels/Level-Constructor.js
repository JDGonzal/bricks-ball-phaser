import { Level01 } from './Level01.js';
import { Level02 } from './Level02.js';
import { Level03 } from './Level03.js';
import { Level04 } from './Level04.js';
import { Level05 } from './Level05.js';
import { Level06 } from './Level06.js';

export class LevelConstructor {
  constructor (game) {
    this.game = game;
    /* Importo los niveles q voy a implementar
    se ejecutan de abajo hacia arriba */
    this.levels = [
      Level06,
      Level05,
      Level04,
      Level03,
      Level02,
      Level01,
    ];
    this.currentLevel = null;
  }

  /*
  Se invocará al arrancar la escena del juego (desde el método
  create del juego), se encarga de coger la última fase del array,
  instanciarla y solicitarle que se cree el grupo de ladrillos
  */
  create () {
    /* El método pop elimina el último elemento de un array y
     devuelve su valor al método que lo llamó */
    const CurrentLevelClass = this.levels.pop();
    this.currentLevel = new CurrentLevelClass(this.game);
    return this.currentLevel.create();
  }

  nextLevel () {
    this.currentLevel.deleteUnbreakableBricks();
    if (this.levels.length === 0) {
      this.game.endGame(true);
    } else {
      return this.create();
    }
  }

  isLevelFinished () {
    return this.currentLevel.isLevelFinished();
  }

  setBrickCollider (elementX) {
    this.currentLevel.setBrickCollider(elementX);
  }
}
