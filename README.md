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

## 04. Colisiones con comportamientos personalizados

1. El método de `Phaser` llamado `collider` en el `create` de
**game.js**, le adicionamos un método propio llamado:
`behaviorCollider` así queda este `physics`:
```js
    // Colisión entre la `platform` y la `ball`
    this.physics.add.collider(this.ball, this.platform,
      this.behaviorCollider, null, this);
```
2. Creamos el método después del `create` de nombre 
`behaviorCollider`:
```js
  behaviorCollider () {
    console.log('poing');
  }
```
3. Creo una función, debajo de `constructor` en **game.js**,
de nombre `init()` con el valor inicial de un `score`:
```js
  init () {
    this.score = 0;
  }
```
3. Usamos el `score` para incrementarlo en el método 
`behaviorCollider`:
```js
  behaviorCollider () {
    this.score++;
    console.log(this.score);
  }
```
4. Ponemos un texto en pantalla en la función `create` de
**game.js**, justo antes de definir la `ball`:
```js
    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', {
      fontSize: '20px',
      fill: 'white',
      fontFamily: 'verdana, arial, sans-serif',
    });
```
5. Ponemos en el nuevo `scoreText` el valor de `score` en
el método `behaviorCollider` de **game.js**:
```js
  behaviorCollider () {
    this.score++;
    this.scoreText.setText(`PUNTOS: ${this.score}`);
  }
```

## 05. Refactorizar el código
1. Creamos una carpeta llamada "components" dentro de "src", luego creamos el archivo de nombre: **Scoreboard.js**
2. Creamos una clase de nombre `Scoreboard` dentro del nuevo
archivo:
```js
export class Scoreboard {
  constructor (game) {
    this.game = game;
    this.score = 0;
  }
}
```
3. El archivo **game.js** debe importar el componente
`Scoreboard`:
```js
import { Scoreboard } from './components/Scoreboard';
```
4. En el método `init` de **game.js** debo instanciar este nuevo 
componente:
```js
  init () {
    this.scoreboard = new Scoreboard(this);
  }
```
5. Movemos la creación del texto al nuevo componente 
**Scoreboard.js**, en una función paralela de nombre `create`:
```js
  create () {
    /* Ponemos el texto en pantalla para el `score` */
    this.scoreText = this.game.add.text(16, 16, 'PUNTOS: 0', {
      fontSize: '20px',
      fill: 'white',
      fontFamily: 'verdana, arial, sans-serif',
    });
  }
```
6. Invocamos en el `create` de **game.js** el create de 
`Scoreboard`:
```js
    this.scoreboard.create();
```
7. En el Archivo **Scoreboard.js**, cramos un método para el 
manejo de los puntos y el texto en pantalla del `score`:
```js
  AddPoints (points) {
    this.score += points;
    this.scoreText.setText(`PUNTOS: ${this.score}`);
  }
```
8. En el archivo **game.js** en el método `behaviorCollider`
hacemos el llamado de `AddPoints`

9. Creo un archivo en la carpeta "components" con el nombre
**jsonUtils.js**, con este código q muevo de **game.js**:
```js
let i = 0;

/* Precarga basado en un json */
export function preloadFromJson ({ load }, { assets }) {
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
export function createFromJson ({ add }, { assets, scale },
  x = 0, y = 0) {
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
10. En el archivo **game.js**, hago la importación de este
nuevo componente ``:
```js
import { preloadFromJson } from './components/jsonUtils.js';
```

## 06. Rebote de la `ball` en función de la posición relativa con la `platform`

1. En el método `behaviorCollider`, puedo recibir dos parámetros
como son la `ball` y la `platform`, mismo orden al momento de
crear la `collider`, en **game.js**:
```js
  behaviorCollider (ball, platform) {
    // Llamo la función de **Scoreboard.js**
    this.scoreboard.addPoints(1);
  }
```
2. Defino el comportamiento entre la `ball` y la `platform` dentro
del método `behaviorCollider` de **game.js**, obteniendo la
posición relativa entre estos:
```js
    const relativeImpact = ball.x - platform.x;
    console.log(relativeImpact);
    console.log(platform.body.width, ball.body.width);
```
3. Con base en el punto que golpeé la `ball` en la `platform`,
cambia la velociad de X, en función a este valor:
```js
    ball.setVelocityX(10 * relativeImpact);
```
4. Agrego una condición si el valor es muy cercano al cero,
le pongo un valor aleatorio a esa velocidad en X:
```js
    if (relativeImpact <= 0.1 && relativeImpact >= -0.1) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(10 * relativeImpact);
    }
```

## 07. Posición Inicial de la `ball`

1. En el **main.js** tengo definida la `gravity`, pues resulta
que se la debemos quitar.
2. En el **game.js** en el método `create` tenemos una variable 
definida como `velocity` y quitamos lo relacionado con esa 
variable.
>[!WARNING]  
> El anterior cambio genera que la bola se quede estancada en la
>parte superior.

3. Cambio la posición de la `ball` en `create` de **game.js**:
```js
    this.ball =
      this.physics.add.image(400, 449, 'ball')
        .setScale(assetsJson.symbols.scale)
        .setOrigin(0.5, 1);
```
4. Cambio la posición de la `platform` en `create` de **game.js**:
```js
    this.platform =
      this.physics.add.image(400, 450, 'platform-normal')
        .setScale(assetsJson.platforms.scale)
        .setOrigin(0.5, 0);
```
5. En el método `update` si la `ball` está muy cerca de la
`platform` le pongo la velocidad que tenga esa `platform` en
**game.js**:
```js
    if (this.platform.y - this.ball.y <= 1) {
      this.ball.setVelocityX(this.platform.body.velocity.x);
    }
```
6. El `GamoOver` tambien le cambio la condición y le añado el
alto de la `ball`:
```js
    if (this.ball.y >= 500 + this.ball.body.height) {
      console.log('GameOver');
      this.gameover.visible = true;
      this.scene.pause();
```
7. Añado en el `update` de **game.js**, otra tecla mas que serían
`space` y `up`, para el salto de la `ball` y antes de llamar el
`gamover`:
```js
    if (this.platform.y - this.ball.y <= 1) {
      this.ball.setVelocityX(this.platform.body.velocity.x);
      /* Salta la `ball` si está en contacto con la `platform` */
      if (this.cursor.space.isDown || this.cursor.up.isDown) {
        this.ball.setVelocity(Phaser.Math.Between(-20, 20), -300);
      }
    }
```
8. Creo un atributo dentro de la `ball` de nombre `glue`, que
lo inicializo en `true`, esto al momento de crear la `ball`:
```js
    this.ball.glue = true;
```
9. En el momento que presiono la barra `space` o la tecla `up`,
la pongo en false.
10. La condición que valida lo cerca que está le añado en la
condición que el `glue` sea `true`:
```js
    if (this.platform.y - this.ball.y <= 1 && this.ball.glue) {
      this.ball.setVelocityX(this.platform.body.velocity.x);
      if (this.cursor.space.isDown || this.cursor.up.isDown) {
        this.ball.setVelocity(Phaser.Math.Between(-20, 20), -300);
        this.ball.glue = false;
      }
    }
```

## 08. Poner lo `bricks` en un `staticGroup`

1. Vamos a trabajar con 4 tipos de bloques, que ya los tenemos
precargados en `preload` de **game,js**, basados en el archivo
**assets.json**:
* `brick-blue`
* `brick-yellow`
* `brick-green`
* `brick-orange`
2. Creo una variable de nombre `bricks` en el `constructor` de 
**game.js**.
3. En el `create` de justo después de `background`, 
definimos la nueva variable `bricks`:
```js
    this.bricks = this.physics.add.staticGroup();
```
4. Al grupo de nombre `bricks`, le asociamos al menos dos de
los ladrillos precargados: `brick-blue` y `brick-green`:
```js
    this.bricks.create(254, 244, 'brick-blue')
      .setScale(assetsJson.bricks.scale).refreshBody();
    this.bricks.create(375, 232, 'brick-green')
      .setScale(assetsJson.bricks.scale).refreshBody();
```
>[!TIP]  
>En este momento la bola cruza por los ladrillos sin tener 
>contacto con ellos, es decir sin tener colisiones.
5. Debajo del primer `collider`, agregamos otro entre la 
`ball` y los `bricks`:
```js
    this.physics.add.collider(this.ball, this.bricks);
```
>[!TIP]  
>Lo del `gameover` lo movemos al final del `create`
6. Cambiamos la forma de crear el `staticGroup`, con 
valore varios:
```js
    this.bricks = this.physics.add.staticGroup({
      key: ['brick-blue', 'brick-orange', 'brick-green', 'brick-yellow'],
      frameQuantity: 10,
      scale: assetsJson.bricks.scale,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
        x: 112,
        y: 100,
      },
    });
```
>[!CAUTION]  
>Hasta aquí el pone los ladrillos en la escala original y
>por tanto quedan muy grandes:  
>![Bricks Group](images/2024-08-23_140225.png "this.bricks = this.physics.add.staticGroup")

7. Añado un recorrido por los elementos de los `bricks` de 
nombre `children`, y realizo los ajustes de `scale`, `size` y
posición en `x`:
```js
    this.bricks.children.each(function (partOf) {
      partOf.setScale(assetsJson.bricks.scale);
      partOf.setSize(partOf.displayWidth, partOf.displayHeight);
      partOf.x -= 112 + 90;
    });
```
