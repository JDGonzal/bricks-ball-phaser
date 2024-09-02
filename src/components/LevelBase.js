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

  /* Será llamado de cada nivel a ser utilizado */
  isLevelFinished () {
    return (this.bricks.countActive() === 0);
  }
}
