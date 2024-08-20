import './style.css';
import Phaser from 'phaser';
import { GameScene } from './game.js';

/* Se crea la configuración básica del Juego */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
};

/* Instanciamos el Juego */
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
