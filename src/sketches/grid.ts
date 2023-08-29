import Paper from "paper";
import { ColorPalette, randBM, randomNumber } from "./utils";
import { Sketch } from ".";
import { times } from "lodash";

export const grid: Sketch = {
  name: 'grid',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;

    const margin = 10;
    const squareSize = 25;
    const xDim = Math.ceil((width - (margin * 2)) / squareSize);
    const yDim = Math.ceil((height - (margin * 2)) / squareSize);
    const xMargin = (width - ((xDim - 1) * squareSize)) / 2
    const yMargin = (height - ((yDim - 1) * squareSize)) / 2

    const colors = new ColorPalette();
    // const colors = new ColorPalette(['#f00', '#0f0', '#00f']);

    // times(xDim, x => {
    //   times(yDim, y => {
    //     const p = new Paper.Point(
    //       xMargin + (x * squareSize),
    //       yMargin + (y * squareSize)
    //     );

    //     const c = new Paper.Path.Circle(p, 3);
    //     c.style.fillColor = colors.black;
    //   })
    // })

    times(400, _nl => {
      let point = new Paper.Point(
        xMargin + (Math.floor(randBM(0, xDim)) * squareSize),
        yMargin + (Math.floor(randBM(0, yDim)) * squareSize)
      )
      let angle = 0;
  
      const path = new Paper.Path([point])
  
      times(10, n => {
        const newPoint = point.clone();
  
        newPoint.x += squareSize;
        newPoint.y += squareSize;
  
        const rotate = randomNumber(3)
        angle += (90 * rotate) % 360
        const rotatedPoint = newPoint.rotate(angle, point)
        
        path.add(rotatedPoint)
        point = rotatedPoint
      })
  
      path.style.strokeCap = 'round'
      path.style.strokeJoin = 'round'
      path.style.strokeWidth = 5
      path.style.strokeColor = colors.getRandomColor()
      // path.style.strokeColor = colors.black;
      path.style.strokeColor.alpha = 0.05
  
      console.log(path.segments)
    })
  }
}