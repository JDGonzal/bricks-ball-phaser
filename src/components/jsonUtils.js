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
  console.log(y);
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
  });
  return y;
}
