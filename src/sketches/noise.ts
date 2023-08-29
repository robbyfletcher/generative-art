import { group } from "console";
import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { perlin2 } from "./perlin";
import { ColorPalette } from "./utils";

export const noise: Sketch = {
  name: "noise",
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = 20;

    const colors = new ColorPalette();

    const num = 10;
    const group = new Paper.Group();
    times(Math.floor(height / dim), (i) => {
      const path = new Paper.Path();
      path.add(new Paper.Point(0, height));

      times(num, (j) => {
        const x = (j / (num - 1)) * width;
        const y = dim * (i + 1);
        const noise = perlin2(x, y);
        path.add(new Paper.Point(x, y + noise * dim));
      });

      path.add(new Paper.Point(width, height));
      path.closePath()

      path.smooth({
        from: 2,
        to: path.segments.length - 2
      });
      // path.style.strokeWidth = dim / 2;
      path.style.strokeColor = colors.white
      path.style.fillColor = colors.getRandomColor();
      group.addChild(path);
    });

    // const circle = new Paper.Path.Circle(
    //   new Paper.Point(width / 2, height / 2), 10
    // )
    // // circle.style.strokeColor = colors.black

    // const g: paper.Path[] = [ circle ]

    // times(150, i => {
    //   const p = new Paper.Path()
    //   times(10, j => {
    //     const lastPath = g[g.length - 1]
    //     const offsetPoint = lastPath.getPointAt(lastPath.length * (j / 10))
    //     const normalPoint = lastPath.getNormalAt(lastPath.length * (j / 10))
    //     const noise = perlin2(offsetPoint.x, offsetPoint.y)

    //     p.add(offsetPoint.add(normalPoint.multiply(10 * noise + 10)))
    //   })
    //   p.closePath()
    //   p.smooth()
    //   // p.style.strokeColor = colors.black
    //   p.style.fillColor = colors.getRandomColor()
    //   p.sendToBack()
    //   g.push(p)
    // })
  },
};
