import { LevelBase } from './LevelBase.js';
import assetsJson from '../assets.json';
import { StaticGroupUtils } from './StaticGroupUtils.js';
import { LivePower } from './powers/Live-Power.js';

export class Level01 extends LevelBase {
  create () {
    // Creamos el `staticGroup` y ponemos los `bricks`
    this.bricks = this.game.physics.add.staticGroup({
      key: ['brick-blue', 'brick-orange', 'brick-green',
        'brick-purple', 'brick-yellow', 'brick-purple',
        'brick-yellow', 'brick-blue', 'brick-orange',
        'brick-green'],
      frameQuantity: 1,
      // scale: assetsJson.bricks.scale,
      gridAlign: {
        width: 5,
        height: 4,
        cellWidth: 150,
        cellHeight: 100,
        x: 40,
        y: 20,
      },
    });

    // Instanciamos `StaticGroupUtils`
    this.fixBricks = new StaticGroupUtils(this.bricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixBricks.fixStaticGroup(
      assetsJson.bricks.scale, -120);

    /* llamamos esto de `LevelBase` */
    this.configureColisions();

    // Invocamos Powers en los `bricks` 3, 4, y 5
    this.powers[3] = new LivePower(this.game);
    this.powers[4] = new LivePower(this.game);
    this.powers[5] = new LivePower(this.game);
  }
}
