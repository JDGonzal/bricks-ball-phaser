export class LevelBase {
  constructor (game) {
    this.game = game;
    this.bricks = null;
    this.powers = [];
  }

  /* Será llamado de cada nivel a ser utilizado */
  configureColisions () {
    this.game.physics.add.collider(this.game.ball, this.bricks,
      this.brickImpact, null, this);
  }

  /* Para los ladrillo irrompibles */
  configureColisionsUnbreakable () {
    this.game.physics.add.collider(this.game.ball,
      this.unbreakableBricks, this.game.unbreakableBricksImpact,
      null, this.game);
  }

  /* Deben ser borrados para limpiar la escena */
  deleteUnbreakableBricks () {
    if (this.unbreakableBricks) {
      this.unbreakableBricks.getChildren().forEach(item => {
        item.disableBody(true, true);
      });
    }
  }

  /* Será llamado de cada nivel a ser utilizado */
  isLevelFinished () {
    return (this.bricks.countActive() === 0);
  }

  /* Consigue el número del índice para usarlo en `brickImpact`  */
  getBrickIndex (brick) {
    const children = this.bricks.getChildren();
    for (const i in children) {
      if (children[i] === brick) {
        return i;
      }
    }
  }

  /* Llamamos luego el `bricksImpact` de **GameScene.js** */
  brickImpact (ball, brick) {
    const brickIndex = this.getBrickIndex(brick);
    console.log('el index es', brickIndex);
    if (this.powers[brickIndex]) {
      console.log('tengo un poder en ', brickIndex);
      this.powers[brickIndex].create(ball.x, ball.y);
    }
    this.game.bricksImpact(ball, brick);
  }
}
