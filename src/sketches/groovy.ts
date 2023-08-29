import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { perlin2, perlin3 } from "./perlin";
import { ColorPalette, randomNumber } from "./utils";

export const groovy: Sketch = {
  name: "groovy",
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = 3;
    const numLines = 100;
    const numPoints = 100;
    const randomZ = Math.random();

    const centerPoint = new Paper.Point(width / 2, height / 2)

    const colors = new ColorPalette();
    const oddColor = colors.getRandomColor()
    const evenColor = colors.getRandomColor()
    

    const line = new Paper.Path([
      new Paper.Point(0, 0),
      new Paper.Point(width, height),
    ])

    line.rotate(randomNumber(90) + 80, centerPoint)

    const topLine = line.clone()
    topLine.position.y -= dim * 2

    const bottomLine = line.clone()
    bottomLine.position.y += dim * 2
    bottomLine.reverse()

    const centerLine = new Paper.Path([
      ...topLine.segments,
      ...bottomLine.segments,
    ]);

    centerLine.style.fillColor = oddColor

    let iteratorLine = topLine.clone();

    times(numLines, (i) => {
      const bottomPath = new Paper.Path();
      const topPath = new Paper.Path();
      times(numPoints, (j) => {
        const point = iteratorLine.getPointAt(
          iteratorLine.length * (j / (numPoints - 1))
        );
        point.y -= dim;

        bottomPath.add(point);
      });

      times(numPoints, (j) => {
        const point = iteratorLine.getPointAt(
          iteratorLine.length * (j / (numPoints - 1))
        );
        const perlin =
          (perlin3(point.x / width, point.y / height, randomZ) + 1) * dim * 4;

        point.y -= perlin + dim;

        topPath.add(point);
      });

      bottomPath.reverse();

      const path = new Paper.Path([
        ...bottomPath.segments,
        ...topPath.segments,
      ]);

      path.smooth();
      path.style.fillColor = i % 2 === 0 ? evenColor : oddColor

      iteratorLine = topPath;
    });

    iteratorLine = bottomLine.clone();

    times(numLines, (i) => {
      const bottomPath = new Paper.Path();
      const topPath = new Paper.Path();
      times(numPoints, (j) => {
        const point = iteratorLine.getPointAt(
          iteratorLine.length * (j / (numPoints - 1))
        );
        point.y += dim;

        bottomPath.add(point);
      });

      times(numPoints, (j) => {
        const point = iteratorLine.getPointAt(
          iteratorLine.length * (j / (numPoints - 1))
        );
        const perlin =
          (perlin3(point.x / width, point.y / height, randomZ) + 1) * dim * 4;

        point.y += perlin + dim;

        topPath.add(point);
      });

      bottomPath.reverse();

      const path = new Paper.Path([
        ...bottomPath.segments,
        ...topPath.segments,
      ]);

      path.smooth();
      path.style.fillColor = i % 2 === 0 ? evenColor : oddColor

      iteratorLine = topPath;
    });
  },
};
