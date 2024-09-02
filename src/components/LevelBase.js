export class LevelBase {
  constructor (game) {
    this.game = game;
    this.bricks = null;
  }

  /* Será llamado de cada nivel a ser utilizado */
  configureColisions () {
    this.game.physics.add.collider(this.game.ball, this.bricks,
      this.game.bricksImpact, null, this.game);
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
}
