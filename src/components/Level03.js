import { LevelBase } from './LevelBase.js';
import assetsJson from '../assets.json';
import { StaticGroupUtils } from './StaticGroupUtils.js';

export class Level03 extends LevelBase {
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

    // Se crea otro `staticGroup`
    this.unbreakableBricks = this.game.physics.add.staticGroup();
    this.unbreakableBricks.create(316, 165, 'brick-gray');
    this.unbreakableBricks.create(466, 165, 'brick-gray');

    // Instanciamos `StaticGroupUtils`
    this.fixUnbreakableBricks =
      new StaticGroupUtils(this.unbreakableBricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixUnbreakableBricks.fixStaticGroup(
      assetsJson.bricks.scale, 20, -30);

    /* llamamos esto de `LevelBase` */
    this.configureColisions();
    this.configureColisionsUnbreakable();
  }
}
