import _, { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randBM } from "./utils";

export const refactor: Sketch = {
  name: 'refactor',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const colors = new ColorPalette();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = Math.floor(height * (3 / 10))

    const start = new Paper.Path.RegularPolygon(
      new Paper.Point(width / 2, height / 2),
      8,
      dim
    )
    
    start.style.fillColor = colors.getRandomColor();
    start.style.fillColor.alpha = 1 / 50;
    times(50, () => {
      const clonedPoly = start.clone();

      times(4, () => {
        for (let i = 0; i < clonedPoly.segments.length; i++) {
          const nextIndex = (i + 1) % clonedPoly.segments.length;
  
          const deformFactor = dim / 4;
          const deform = randBM(0, deformFactor * 2) - deformFactor;

          const p = clonedPoly.segments[i].point.add(clonedPoly.segments[nextIndex].point).divide(2);
    
          // const p = new Paper.Point(
          //   (clonedPoly.segments[i].point.x + clonedPoly.segments[nextIndex].point.x) / 2,
          //   (clonedPoly.segments[i].point.y + clonedPoly.segments[nextIndex].point.y) / 2,
          // )

          const location = clonedPoly.getLocationOf(p).offset;

          const normal = clonedPoly.getNormalAt(location).multiply(deform);
    
          clonedPoly.insert(++i, p.add(normal));
        }
      })

    })

    start.visible = false;

    // start.segments.forEach(s => {
    //   const p = new Paper.Path.Circle(s.point, 4);
    //   p.style.fillColor = colors.black;
    // })
  }
}