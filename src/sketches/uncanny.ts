import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randomNumber, watercolorize } from "./utils";

export const uncanny: Sketch = {
  name: 'uncanny',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = Math.floor(width * (4 / 10))

    const colors = new ColorPalette()

    times(60, () => {
      const tri = new Paper.Path.RegularPolygon(
        new Paper.Point(randomNumber(width), randomNumber(height)),
        3,
        randomNumber(dim) + dim
      )
      if (randomNumber(10) < 5) tri.rotate(180)
      
      tri.style.fillColor = colors.getRandomColor()

      watercolorize(tri, 30, dim / 2, 1)
    })
  }
}
