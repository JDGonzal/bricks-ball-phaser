import { LevelBase } from './LevelBase.js';
import assetsJson from '../../assets.json';
import { StaticGroupUtils } from '../StaticGroupUtils.js';
import { Diamonds } from '../Diamonds.js';
import { LivePower } from '../powers/Live-Power.js';
import { LargePlatformPower } from '../powers/Large-Platform-Power.js';
import { GluePower } from '../powers/Glue-Power.js';
export class Level02 extends LevelBase {
  create () {
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

    // Instanciamos `StaticGroupUtils`
    this.fixBricks = new StaticGroupUtils(this.bricks);
    // se hace el fix de los `bricks` del `staticGroup`
    this.fixBricks.fixStaticGroup(
      assetsJson.bricks.scale);

    /* llamamos esto de `LevelBase` */
    this.configureColisions();

    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    this.setBrickCollider(this.diamonds.diamonds);
    // Invocamos Powers en los `bricks` 11, 10, y 4
    this.powers[11] = new LivePower(this.game, this.diamonds);
    this.powers[10] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[4] = new GluePower(this.game, this.diamonds);
  }
}
