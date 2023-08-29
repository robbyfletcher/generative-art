import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randomNumber } from "./utils";

export const copycat: Sketch = {
  name: "copycat",
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;

    const colors = new ColorPalette();

    times(100, () => {
      const startingPoint = new Paper.Point(width / 2, height / 2);
      const points: paper.Point[] = [startingPoint];
      let angle = 0;
      const numPoints = 6;
      times(numPoints - 1, () => {
        angle += randomNumber((200 / numPoints) * 2);
        const p = new Paper.Point(randomNumber(width / 8) + width / 8, 0)
          .add(points[points.length - 1])
          .rotate(angle, points[points.length - 1]);

        points.push(p);
      });
      const path = new Paper.Path(points);
      path.closePath();

      const newPath = new Paper.Path()
      let i = 0
      while (i < path.length) {
        newPath.add(path.getNormalAt(i).multiply(randomNumber(20)).add(path.getPointAt(i)))
        i += 50
      }

      const rotate = randomNumber(360);
      path.rotate(rotate);

      const shiftX = randomNumber((width - newPath.bounds.width) * 2) - newPath.bounds.x * 2;
      const shiftY = randomNumber((height - newPath.bounds.height) * 2) - newPath.bounds.y * 2;
      newPath.position.x += shiftX;
      newPath.position.y += shiftY;

      newPath.closePath()
      newPath.smooth({
        type: 'continuous'
      })

      newPath.fillColor = colors.getRandomColor()
      // path.fillColor.alpha = 0.8
      // path.strokeColor = colors.white
    });
  },
};
