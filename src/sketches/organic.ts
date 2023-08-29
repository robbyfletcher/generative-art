import _, { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randBM, randomNumber, watercolorize } from "./utils";

export const organic: Sketch = {
  name: 'organic',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = Math.floor(width * (4 / 10))

    const colors = new ColorPalette()

    const centerPoint = new Paper.Point(width / 2, height / 2)

    const hex = new Paper.Path.RegularPolygon(
      centerPoint,
      6,
      dim / 2,
    )
    const hexMask = hex.clone()
    hexMask.scale(2)
  
    times(10, i => {
      const hexMask = hex.clone()
      hexMask.scale(2)
      let rotationPoint = centerPoint.clone()
      const offset = new Paper.Point(
        randBM(0, width) - width / 2,
        randBM(0, height) - height / 2
      )
      rotationPoint = rotationPoint.add(offset)
      hexMask.position = hexMask.position.add(offset)
      _.times(6, j => {
        const watercolor = hex.clone()
  
        watercolor.position.x += dim
        watercolor.style.fillColor = colors.getRandomColor()
        watercolor.rotate(360 * (j / 6), rotationPoint)
        const group = watercolorize(watercolor, 30, 200, 0.1)
        group.insertChild(0, hexMask.clone())
        group.clipped = true
      })
    })
    
  }
}