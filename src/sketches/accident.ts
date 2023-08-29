import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { perlin3 } from "./perlin";
import { ColorPalette, gen2dArray, randomNumber } from "./utils";

export const accident: Sketch = {
  name: 'accident',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const dim = 20;
    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const resX = Math.floor(width / dim);
    const resY = Math.floor(height / dim);

    const colors = new ColorPalette()

    const randomRotation = randomNumber(60) - 30
    const randomZ = Math.random() * 2 - 1
    const arr = gen2dArray(resX, resY, (x, y) => (perlin3(x / resX, y / resY, randomZ) + 1) * 90 + randomRotation)

    const intersectArr: boolean[][] = gen2dArray(resX * dim, resY * dim, () => false)

    const density = dim;

    const shift = new Paper.Point(0, density * 2);

    new Paper.Path.Rectangle({
      point: [0, 0],
      size: [width, height],
      fillColor: "#fff",
    });

    const addPointToArr = (
      point: paper.Point,
      arr: boolean[][]
    ): boolean[][] => {
      const x = Math.floor(point.x)
      const y = Math.floor(point.y)
      arr[x][y] = true
      return arr
    }

    const checkIntersectionArr = (
      point: paper.Point,
      arr: boolean[][]
    ): boolean => {
      const startX = Math.max(Math.floor(point.x) - density, 0)
      const startY = Math.max(Math.floor(point.y) - density, 0)
      const endX = Math.min(startX + (density * 2), resX * dim)
      const endY = Math.min(startY + (density * 2), resY * dim)
      const window = arr
        .slice(startX, endX)
        .map(xArr => xArr.slice(startY, endY))

      return window.some(x => x.some(y => y === true))
    }

    const followPath = (
      point: paper.Point,
      path: paper.Path,
      direction: boolean,
      intersectArr: boolean[][]
    ): paper.Path => {
      path.add(point);
      intersectArr = addPointToArr(point, intersectArr)

      const x = Math.floor(point.x / dim);
      const y = Math.floor(point.y / dim);
      const ang = direction ? arr[x][y] : arr[x][y] + 180;

      const nextPoint = point.add(shift).rotate(ang, point);
      const nextX = Math.floor(nextPoint.x / dim);
      const nextY = Math.floor(nextPoint.y / dim);

      if (
        nextX < resX &&
        nextX >= 0 &&
        nextY < resY &&
        nextY >= 0 &&
        !checkIntersectionArr(nextPoint, intersectArr)
      ) {
        return followPath(nextPoint, path, direction, intersectArr);
      } else {
        return path;
      }
    };

    const points = Array(resX * resY)
      .fill(0)
      .map((e, i) => i);


    times(20, (i) => {
      const n = points.splice(randomNumber(points.length), 1)[0];

      const p = new Paper.Point((n % resX) * dim, Math.floor(n / resX) * dim);

      const path = new Paper.Path();
      const reversePath = new Paper.Path();

      followPath(p, path, true, intersectArr);
      followPath(p, reversePath, false, intersectArr);

      reversePath.reverse();
      const topPath = new Paper.Path([
        ...reversePath.segments,
        ...path.segments,
      ]);
      
      const bottomPath = topPath.clone();
      bottomPath.position.y += dim * 4;
      bottomPath.reverse();

      const line = new Paper.Path([
        ...topPath.segments,
        ...bottomPath.segments,
      ]);
      line.closePath();

      const stroke = line.clone()
      
      stroke.style.fillColor = colors.getRandomColor()
      line.style.strokeColor = colors.black
      line.style.strokeWidth = 5

      line.smooth({
        from: 0,
        to: line.segments.length / 2 - 1,
      });

      line.smooth({
        from: Math.floor(line.segments.length / 2),
        to: -1,
      });
    });
  }
}
