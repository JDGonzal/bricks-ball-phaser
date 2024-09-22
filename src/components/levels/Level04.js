import { LevelBase } from './LevelBase.js';
import assetsJson from '../../assets.json';
import { StaticGroupUtils } from '../StaticGroupUtils.js';
import { Diamonds } from '../Diamonds.js';
import { LivePower } from '../powers/Live-Power.js';
import { LargePlatformPower } from '../powers/Large-Platform-Power.js';
import { GluePower } from '../powers/Glue-Power.js';

export class Level04 extends LevelBase {
  create () {
    // Creamos el `staticGroup` y ponemos los `bricks`
    this.bricks = this.game.physics.add.staticGroup({
      key: ['brick-blue', 'brick-orange',
        'brick-green', 'brick-yellow'],
      frameQuantity: 10,
      // scale: assetsJson.bricks.scale,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
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

    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    this.setBrickCollider(this.diamonds.diamonds);
    // Invocamos Powers en los `bricks` 3, 35, 1, 24, 16, 29
    this.powers[3] = new LivePower(this.game, this.diamonds);
    this.powers[35] = new LivePower(this.game, this.diamonds);
    this.powers[1] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[24] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[16] = new GluePower(this.game, this.diamonds);
    this.powers[29] = new GluePower(this.game, this.diamonds);
  }
}
