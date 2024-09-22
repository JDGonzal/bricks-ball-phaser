import { LevelBase } from './LevelBase.js';
import assetsJson from '../../assets.json';
import { StaticGroupUtils } from '../StaticGroupUtils.js';
import { Diamonds } from '../Diamonds.js';
import { LivePower } from '../powers/Live-Power.js';
import { LargePlatformPower } from '../powers/Large-Platform-Power.js';

export class Level05 extends LevelBase {
  create () {
    this.bricks = this.game.physics.add.staticGroup({
      key: ['brick-blue'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 130,
        cellHeight: 34,
        x: 40,
        y: 20,
      },
    });
    // Instanciamos `StaticGroupUtils`
    this.fixBricks = new StaticGroupUtils(this.bricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixBricks.fixStaticGroup(
      assetsJson.bricks.scale);

    this.unbreakableBricks = this.game.physics.add.staticGroup({
      key: ['brick-gray'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 130,
        cellHeight: 34,
        x: 40,
        y: 60,
      },
    });
    // Instanciamos `StaticGroupUtils`
    this.fixUnbreakableBricks =
        new StaticGroupUtils(this.unbreakableBricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixUnbreakableBricks.fixStaticGroup(
      assetsJson.bricks.scale);

    /* llamamos esto de `LevelBase` */
    this.configureColisions();
    this.configureColisionsUnbreakable();

    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    this.setBrickCollider(this.diamonds.diamonds);
    // Invocamos Powers en los `bricks` 1, y 3
    this.powers[1] = new LivePower(this.game, this.diamonds);
    this.powers[3] = new LargePlatformPower(this.game, this.diamonds);
  }
}
