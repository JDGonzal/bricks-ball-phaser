export class Scoreboard {
  constructor (game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
  }

  create () {
    /* Ponemos el texto en pantalla para el `score` */
    this.scoreText = this.game.add.text(16, 16, 'PUNTOS: 0', {
      fontSize: '20px',
      fill: 'white',
      fontFamily: 'verdana, arial, sans-serif',
    });
  }

  addPoints (points) {
    this.score += points;
    this.scoreText.setText(`PUNTOS: ${this.score}`);
  }
}
