import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randomNumber, seededRandom } from "./utils";

let i = randomNumber(1000);

export const loop: Sketch = {
  name: 'loop',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = width < height ? (width * 30) / 100 : (height * 30) / 100;

    const colors = new ColorPalette()

    new Paper.Path.Rectangle({
      point: [0, 0],
      size: [width, height],
      fillColor: "#fff",
    });

    const genCircle = (dim: number, variance: number, color: paper.Color) => {
      const outerPoints = [
        [width / 2, height / 2 - dim - seededRandom(i++, variance)],
        [width / 2 + dim + seededRandom(i++, variance), height / 2],
        [width / 2, height / 2 + dim + seededRandom(i++, variance)],
        [width / 2 - dim - seededRandom(i++, variance), height / 2],
      ];

      const p = new Paper.Path(
        outerPoints.map((p) => new Paper.Point(p[0], p[1]))
      );

      p.closePath();
      p.smooth({ type: "geometric", factor: 0.5 });

      p.rotate(seededRandom(i++, 360));

      p.style.fillColor = color;
      p.style.strokeWidth = 2;

      return p;
    };

    times(5, (i) => {
      const color = colors.colors[seededRandom(i++, colors.colors.length)]
      color.alpha = 0.4;
      genCircle(dim, dim / 2, color);
    });
  }
}