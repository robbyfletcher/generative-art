import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { perlin2 } from "./perlin";
import { ColorPalette } from "./utils";

export const spiral: Sketch = {
  name: "spiral",
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = 25;
    const points = 100;
    const variance = 4;

    const colors = new ColorPalette();
    const centerPoint = new Paper.Point(width / 2, height / 2);

    const circle = new Paper.Path.Circle(centerPoint, dim);
    // circle.style.strokeColor = colors.black;

    // const line = new Paper.Path([
    //   new Paper.Point(-1 * width, 0),
    //   new Paper.Point(width, 2 * height)
    // ])

    // const line = new Paper.Path([
    //   new Paper.Point(0, 0),
    //   new Paper.Point(width, height),
    // ]);

    const line = new Paper.Path([
      new Paper.Point(0, height),
      new Paper.Point(width, height),
    ]);
    line.style.strokeColor = colors.black;

    const group = [line];

    times(100, (i) => {
      const p = new Paper.Path();

      const lastPath = group[group.length - 1];

      for (let j = 0; j < lastPath.length / points; j++) {
        const offset = Math.min(j * points, lastPath.length);
        const offsetPoint = lastPath.getPointAt(offset);
        const normal = lastPath.getNormalAt(offset);
        const noise = 2 + perlin2(offsetPoint.x, offsetPoint.y);

        p.add(offsetPoint.add(normal.multiply(new Paper.Point(1, variance * noise))));
      }

      p.smooth();
      p.style.strokeColor = colors.black;
      p.style.strokeWidth = 2;
      group.push(p);
    });

    // group.reverse();

    // times(200, (i) => {
    //   const p = new Paper.Path();
    //   times(points + 1, (j) => {
    //     const lastPath = group[group.length - 1];
    //     const offset = lastPath.getPointAt(lastPath.length * (j / points));
    //     const normal = lastPath.getNormalAt(lastPath.length * (j / points));
    //     const noise = perlin2(offset.x, offset.y);

    //     p.add(offset.add(normal.multiply(-1 * (variance * noise + variance))));
    //   });

    //   // p.closePath();
    //   p.smooth();
    //   p.style.strokeColor = colors.getRandomColor();
    //   group.push(p);
    // });

    // const spiral = new Paper.Path([centerPoint]);

    // let iteratorPoint: paper.Point = centerPoint.clone()
    // let ang = 0

    // times(500, (i) => {
    //   ang += (perlin2(iteratorPoint.x, iteratorPoint.y) + 1) * 45
    //   const p = new Paper.Point(dim, 0)
    //   iteratorPoint = iteratorPoint.add(p).rotate(ang, iteratorPoint)
    //   spiral.add(iteratorPoint)
    // });

    // spiral.smooth()
    // spiral.style.strokeColor = colors.black
  },
};
