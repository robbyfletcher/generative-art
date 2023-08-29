import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette, randomNumber, watercolorize } from "./utils";

const jitterize = (path: paper.Path, spacing: number, jitter: number): paper.Path => {
  const newPath = new Paper.Path()
  let i = 0
  while (i < path.length) {
    newPath.add(
      path
        .getNormalAt(i)
        .multiply(randomNumber(jitter))
        .add(path.getPointAt(i))
    )
    i += randomNumber(spacing)
  }
  return newPath
}

export const peaks: Sketch = {
  name: 'peaks',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = Math.floor(height * (2 / 10))

    const colors = new ColorPalette()

    times(5, i => {
      const p = new Paper.Path([
        new Paper.Point(width * -1 / 4, height / 2),
        new Paper.Point(width / 2, height / 2 - (dim * (5 - i) / 5)),
        new Paper.Point(width * 5 / 4, height / 2),
        new Paper.Point(width / 2, height / 2 + (dim * (5 - i) / 5)),
      ])
      p.closePath()
      p.smooth()
  
      const c = colors.getRandomColor()
  
      times(30, () => {
        const jp = jitterize(p, 30, 20)
        // jp.smooth()
        jp.fillColor = c
        jp.fillColor.alpha = 1 / 30
      })  
    })  
  }
}