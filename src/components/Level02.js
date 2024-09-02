import { LevelBase } from './LevelBase.js';
import assetsJson from '../assets.json';
import { StaticGroupUtils } from './StaticGroupUtils.js';

export class Level02 extends LevelBase {
  create () {
    // Instanciamos `StaticGroupUtils`
    this.staticGroupUtils = new StaticGroupUtils(this);

    // Creamos el `staticGroup` y ponemos los `bricks`
    this.bricks = this.game.physics.add.staticGroup();
    this.bricks.create(400, 270, 'brick-orange');
    this.bricks.create(360, 225, 'brick-orange');
    this.bricks.create(440, 225, 'brick-orange');
    this.bricks.create(480, 180, 'brick-orange');
    this.bricks.create(400, 180, 'brick-orange');
    this.bricks.create(320, 180, 'brick-orange');
    this.bricks.create(280, 135, 'brick-orange');
    this.bricks.create(360, 135, 'brick-orange');
    this.bricks.create(440, 135, 'brick-orange');
    this.bricks.create(520, 135, 'brick-orange');
    this.bricks.create(330, 90, 'brick-orange');
    this.bricks.create(470, 90, 'brick-orange');

    // se hace el fix de los `bricks` del `staticGroup`
    this.staticGroupUtils.fixStaticGroup(
      assetsJson.bricks.scale);

    /* llamamos esto de `LevelBase` */
    this.configureColisions();
  }
}
