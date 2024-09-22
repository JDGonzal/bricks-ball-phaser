import { LevelBase } from './LevelBase.js';
import assetsJson from '../../assets.json';
import { StaticGroupUtils } from '../StaticGroupUtils.js';
import { Diamonds } from '../Diamonds.js';
import { LivePower } from '../powers/Live-Power.js';
import { LargePlatformPower } from '../powers/Large-Platform-Power.js';
import { GluePower } from '../powers/Glue-Power.js';

export class Level06 extends LevelBase {
  create () {
    this.bricks = this.game.physics.add.staticGroup({
      key: ['brick-light-blue', 'brick-brown', 'brick-light-blue',
        'brick-brown', 'brick-light-blue'],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 80,
        y: 20,
      },
    });
    // Instanciamos `StaticGroupUtils`
    this.fixBricks = new StaticGroupUtils(this.bricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixBricks.fixStaticGroup(
      assetsJson.bricks.scale, -160);

    this.bricks.getChildren().forEach((element, idx) => {
      if ((idx >= 10 && idx < 20) || (idx >= 30 && idx < 40)) {
        idx++;
      }
      if (((idx + 1) % 2) === 0) {
        element.disableBody(true, true);
      }
    });

    /* llamamos esto de `LevelBase` */
    this.configureColisions();

    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    this.setBrickCollider(this.diamonds.diamonds);
    // Invocamos Powers en los `bricks` 3, 14, 21, 4, 15, 22
    this.powers[3] = new LivePower(this.game, this.diamonds);
    this.powers[14] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[21] = new GluePower(this.game, this.diamonds);
    this.powers[4] = new LivePower(this.game, this.diamonds);
    this.powers[15] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[22] = new GluePower(this.game, this.diamonds);
  }
}
