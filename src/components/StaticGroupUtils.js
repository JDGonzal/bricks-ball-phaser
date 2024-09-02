export class StaticGroupUtils {
  constructor (bricksGroup) {
    this.bricksGroup = bricksGroup;
  }

  /* Añado un recorrido de los `children` del grupo de nombre
  `bricks` para ajustar: `scale`, `size` y posición `x` */
  fixStaticGroup (scale = 1, deltaX = 0, deltaY = 0) {
    this.bricksGroup.children.each(function (partOf) {
      partOf.setScale(scale);
      partOf.setSize(partOf.displayWidth, partOf.displayHeight);
      partOf.x += deltaX;
      partOf.y += deltaY;
      partOf.setOrigin(0.5, 1);
      partOf.refreshBody(); // Este siempre de último
    });
  }
}
