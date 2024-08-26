import './style.css';
import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { CongratulationsScene } from './scenes/CongratulationsScene.js';

/* Se crea la configuración básica del Juego */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [GameScene, GameOverScene, CongratulationsScene],
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: false,
    },
  },
};

/* Instanciamos el Juego */
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
