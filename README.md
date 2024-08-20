# BRICKS BALL PHASER
Basado en este video:  
[![Construye tu primer juego con Phaser](images/2024-08-19_052741.png "Construye tu primer juego con Phaser")](https://www.youtube.com/watch?v=8YUXg3nKSN4&list=PLIcuwIrm4rKeWg-592IgvbnAVoac-nmZJ)
>[!IMPORTANT] 
> * El código original está en este repositorio: 
>[ball-game-phaser
](https://github.com/deswebcom/ball-game-phaser)  
>del usuario [DesarrolloWeb.com](https://github.com/deswebcom) 
>desde Octubre 14 de 2021.
> * La librería base esta en este sitio: 
>[PHASER](https://phaser.io/).
> * Esta es una guía para empezar:
[Cómo crear tu primer juego con Phaser](https://phaser.io/tutorials/making-your-first-phaser-3-game-spanish#:~:text=Para%20iniciar%20un%20juego%20en,menudo%20desde%20una%20variable%20global.).
> * Este manual es de **DesarrolloWeb.com**:  
>[Manual de Phaser](https://desarrolloweb.com/manuales/phaser3).

## 00. Precondiciones
1. Tener el Editor [Visual Studio Code](https://code.visualstudio.com/insiders/).
2. Extensiones insaladas dentro de 
`Visual Studio Code`:  
  * [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) 
de [Aaron Bond](https://aaronbond.co.uk/).
  * [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 
de [Alexander](https://marketplace.visualstudio.com/publishers/usernamehw).
  * [Javascript-Essentials](https://marketplace.visualstudio.com/items?itemName=Gydunhn.javascript-essentials)
  de [Gydunhn](https://marketplace.visualstudio.com/publishers/Gydunhn),  
  Este instala un paquete con:
    * ESLint
    * npm Intellisense 
    * IntelliCode
    * JavaScript (ES6) code snippets
    * Debugger for Firefox
    * Path Intellisense
    * Formatting Toggle
  * [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  de [Ritwick Dey](https://marketplace.visualstudio.com/publishers/ritwickdey).
  * [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)
  de [Kiss Tamás](https://marketplace.visualstudio.com/publishers/kisstkondoros) 
3. Instalar `nvm` descargando el instalador desde este sitio:
[nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).
4. Instalar el `node`, que a su vez
trae el `npm` basado en este sitio: 
[Instalar múltiples versiones de Node.js en Windows](https://rafaelneto.dev/blog/instalar-multiples-versiones-nodejs-windows/).  
Con el `nvm` permite múltiples versiones
del `node`.
5. El programa `pnpm` es similar al `npm`, siendo un mejor empaquetador.  
Este lo puede conseguir con las instrucciones de este sitio
[pnpm Installation](https://pnpm.io/installation).

## 01. Local Setup
1. Abrir una nueva `TERMINAL` y ejecutar el comando:
```bash
pnpm create vite@latest
```
* Project name: src
* Vanilla
* JavaScript
2. Pasamos solo el archivo **package.json** a la 
raíz del proyecto.
3. Empezamos con el archivo **style.css**, para
dejarlo solo con esto:
```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
```
4. del archivo **main.js**, borrar todo menos la primera línea de
`import './style.css'`.
5. De la carpeta "src" borro estos tres archivos:
  * **javascript.svg**
  * **counter.js**
  * **.gitignore**
>[!WARNING]  
> Solo de la carpeta "src".
6. Cambio en **index.html** la linea que tiene:  
`<title>Vite App</title>` por:  
`<title>Bricks Ball Game</title>`
7. Del archivo **index.html**, cambiamos la línea de  
`<div id="app"></div>` por:  
`<h1>Bricks Ball Phaser</h1>` 
8. Ajustamos el archivo **package.json**, en la
línea de `"dev"`, para dejarlo así:  
`"dev": "vite ./src",`
9. Ejecutamos el comando en la `TERMINAL`:
```bash
pnpm install
```
10. Ejecutamos el comando en la `TERMINAL`:
```bash
pnpm i phaser
```
11. Ejecutamos el proyecto en la `TERMINAL` con:
```bash
pnpm dev
```
* La probable ruta puede ser: `http://localhost:5173/``
12. Navegamos a la ruta sugerida con cualquier browser.
13. El browser debe ser algo parecido a esto:  
![Browser 01](images/2024-08-19_062606.png)
14. Y así debe verse el proyecto hasta el 
momento:  
![Project-01](images/2024-08-19_063619.png)

>[!TIP]  
>### ESLint o Analizador estático de código fuente
>1. Tener instalado de forma global el `eslint`, con el comando:
>```bash
>npm install -g eslint
>```
>* **Esto solo se hace una vez y toca con el comando `npm`.**
>2. Instalar para el proyecto el paquete `standard`:
>```bash
>pnpm install standard -D
>```
>3. Crear el archivo **.eslintrc.json**, con este contenido:
>```json
> {
>   "extends": ["standard"],
>   "rules": {
>     "semi" : [2, "always"],
>     "comma-dangle": [2, "always-multiline"] 
>   }
> }
>```
>4. Presiono en `Visual Studio Code` las teclas: 
> [`Ctrl`] + [`Shift`] + [`P`]  
> y selecciono o busco `Restart ESLint Server`

>[!TIP]  
>### Si por alguna razón aparece el archivo **package-lock.json**, por favor borrarlo.  
>### Pues se supone estamos trabajando con `pnpm`.

## [02. Introducción a Phaser](https://desarrolloweb.com/articulos/introduccion-phaser)
[Construye tu primer juego con Phaser](https://www.youtube.com/watch?v=8YUXg3nKSN4)

1. En la carpeta "src" edito el archivo 
**main.js** y lo primero que pide es una 
corrección: `Missing semicolon.eslint(semi)`, o
añado el punto y coma (`;`) faltante o pongo el
mouse encima del error o línea roja y selecciono
 `Quick Fix` y voy a la última opción: 
 `Fix all auto-fixable problems`.
2. Añadimos este código en **main.js**:
```js
import Phaser from 'phaser';
import { GameScene } from './game.js';

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
```
3. Instanciamos el juego en **main.js**, usando 
el `config`:
```js
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
```
4. Creamos en la carpeta "src" el archivo:
**game.js**, con este código:
```js
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game' });
  }

  preload () {}

  create () {}

  update () {}
};
```
5. Se crea en la carpeta "/src/public" la carpeta:
"assets" y ponemos dos archivos de imágenes de 
esta ruta: [images](https://github.com/deswebcom/ball-game-phaser/tree/introduccion/images):  
* **background.png**
* **gameover.png**
6. En el método `preload` precargamos las 
imágenes:
```js
  preload () {
    /* Pregargamos los archivos de imagenes */
    this.load.image('background', '/assets/background.png');
    this.load.image('gameover', '/assets/gameover.png');
  }
```
7. Creamos dos variables en el `constructor`
del **game.js**:
```js
    this.background = null;
    this.gameover = null;
```
8. Primero ponemos el fondo de pantalla, y le 
configuramos que el origen esté en `(0, 0)`:
```js
    this.background =
      this.add.image(0, 0, 'background')
        .setOrigin(0, 0);
```
>[!CAUTION]  
>Corregí en **main.js**, el `config` con un error
>de tipeado:
>```diff
>const config = {
>  type: Phaser.AUTO,
>-  with: 800,
>  height: 500,
>  scene: [GameScene],
>  physics: {
>    default: 'arcade',
>    arcade: {
>      gravity: { y: 400 },
>      debug: false,
>    },
>  },
>};
>```
>Lo correcto debe ser:  
>`  width: 800,`
9. Ponemos el texto de `gameover`, sin configurar
el origen, para que tome el punto medio, por 
defecto:
```js
    this.gameover =
      this.add.image(400, 250, 'gameover');
```
10. De este sitio voy a cargar el resto de elementos
del juego: [Breakout (Brick Breaker) Tile Set - Free](https://opengameart.org/content/breakout-brick-breaker-tile-set-free), y paso 
el contenido de la carpeta "PNG" 
(61 imágenes) a la carpeta 
"src/public/assets/json".
11. Voy a crear un archivo en "src" llamado 
**assets.json**, con una estructura similar a este:
```js
// Generated by https://quicktype.io
export interface TopLevel {
  bricks:    Level1;
  boxes:     Level1;
  platforms: Level1;
  symbols:   Level1;
}

export interface Level1 {
  scale:  number;
  assets: Level2[];
}

export interface Level2 {
  key: string;
}
```
12. En el archivo **game.js**, añado una
`import` y luego dos funciones, para usar en
`preload` y `create`:
```js
import assetsJson from './assets.json'; 

let i = 0;
let x = 0;
let y = 0;

/* Precarga basado en un json */
function preloadFromJson ({ load }, { assets }) {
  assets.forEach(({ key }) => {
    i++;
    const path = './assets/json/' +
    ('00' + i).slice(-2) +
    '-Breakout-Tiles.png';
    load.image(key, path);
  });
}

/* Muestra basados en un json */
// eslint-disable-next-line no-unused-vars
function createFromJson ({ add }, { assets, scale }) {
  assets.forEach(({ key }) => {
    if (x >= 800) {
      x = 0;
      y += 26;
    }
    add.image(x, y, key)
      .setOrigin(0, 0)
      .setScale(scale);
    if (key.substring(0, 8) === 'platform') x += 100;
    else x += 80;
    i++;
  });
}
```
13. En el `preload` de **game.js**, pongo
estas nuevas líneas:
```js
    preloadFromJson(this, assetsJson.bricks);
    preloadFromJson(this, assetsJson.boxes);
    preloadFromJson(this, assetsJson.platforms);
    preloadFromJson(this, assetsJson.symbols);
```
14. En el `create`de **game.js**, puse esto,
pero las comenté, solo necesitaba confirmar
si aparecían en pantalla:
```js
    // Si quiero ver en pantalla lo del json
    /*
    i = this.scene.scene.add.displayList.list.length;
    createFromJson(this, assetsJson.bricks);
    x = 0; y += 26;
    createFromJson(this, assetsJson.boxes);
    x = 0; y += 26;
    createFromJson(this, assetsJson.platforms);
    x = 0; y += 26;
    createFromJson(this, assetsJson.symbols);
    */
```
15. La imagen de `gameover`la ponemos no 
visible, en el `create` de **game.js**:
```js
    this.gameover.visible = false;
```

## 03. La Plataforma, la Bola y sus físicas

1. Creamos la variable en el `constructor`
de **game.js**, para la `platform`.
2. Ya tenemos precargada varias plataformas, 
para el ejercicio vamos a usar
`platform-normal` y lo mostramos en `create`
de **game.js**, con `physics`:
```js
    this.platform =
      this.physics.add.image(400, 460, 'platform-normal')
        .setScale(assetsJson.platforms.scale);
```
3. Como la `platform` cae le decimos que no
va a tener gravedad:
```js
    this.platform.body.allowGravity = false;
```
4. Definimos un elemento para el manejo de 
las teclas primero en el `constructor` de
**game.js** y luego en el `create`:
```js
    this.cursor = this.input.keyboard.createCursorKeys();
```
5. En el método `update` de **game.js**,
definimos cuando se pulse una tecla y la 
acción:
```js
    if (this.cursor.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (this.cursor.right.isDown) {
      this.platform.setVelocityX(500);
    } else this.platform.setVelocityX(0);
```

6. Ya la `ball` está precargada, solo
la definimos en `constructor` y la ponemos 
en pantalla en el `create` de **game.js**, y
la pongo antes de crear la `platform`:
```js
    this.ball =
      this.physics.add.image(400, 100, 'ball')
        .setScale(assetsJson.symbols.scale);
```
7. Como la `ball` se sigue derecho, provocamos
una colisión, después de 
`this.platform.body.allowGravity = false;` :
```js
this.physics.add.collider(this.ball, this.platform);
```
8. Vamos aprovocar el rebote de la `ball` apenas
haga una colisión, en ela función `create` de **game.js**:
```js
    this.ball.setBounce(1);
```
9. Para evitar que la `platform` se hunda con la
`ball`, añado a la `platform` un `setImmovable` en el `create`:
```js
    this.platform.setImmovable();
```
10. Haremos que  la `ball` aparezca de forma aleatoria y lo hacemos 
antes de la colisión entre la `ball` y la `platform`, en el método
`create` de **game.js**:
```js
    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);
```
11. Al principio del método `create` de **game.js**, definimos
los límites del mundo o `world`:
```js
    this.physics.world.setBoundsCollision(true, true, true, false);
```
12. Adicional se debe decir al objeto `ball` que tiene colisión
con el mundo, en el `create` de **game.js**, justo después de 
crear la `ball`:
```js
     this.ball.setCollideWorldBounds(true);
```
13. En el método `update` de **game.js**, al final si la `ball`
sale del juego, se avisa que el juego se ha terminado y se pausa
la `scene`:
```js
    if (this.ball.y >= 500) {
      console.log('GamoeOver');
      this.gameover.visible = true;
      this.scene.pause();
    }
```
