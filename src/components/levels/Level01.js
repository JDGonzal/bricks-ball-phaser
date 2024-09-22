import { LevelBase } from './LevelBase.js';
import assetsJson from '../../assets.json';
import { StaticGroupUtils } from '../StaticGroupUtils.js';
import { Diamonds } from '../Diamonds.js';
import { LivePower } from '../powers/Live-Power.js';
import { LargePlatformPower } from '../powers/Large-Platform-Power.js';
import { GluePower } from '../powers/Glue-Power.js';

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

    // Se crea otro `staticGroup` para los `unbreakableBricks`
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

    // Instanciamos la clase `Diamonds`
    this.diamonds = new Diamonds(this.game);
    this.setBrickCollider(this.diamonds.diamonds);
    // Invocamos Powers en los `bricks` 3, 5, y 7
    this.powers[3] = new LivePower(this.game, this.diamonds);
    this.powers[5] = new LargePlatformPower(this.game, this.diamonds);
    this.powers[7] = new GluePower(this.game, this.diamonds);
  }
}
