import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette } from "./utils";

export const gradient: Sketch = {
  name: "gradient",
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;

    const colors = new ColorPalette();

    const path = new Paper.Path([
      new Paper.Point(0, height / 2),

      new Paper.Point(width / 4, height / 2 + 50),
      new Paper.Point(width / 2, height / 2 + 80),
      new Paper.Point(width * 3 / 4, height / 2 + - 10),

      new Paper.Point(width, height / 2),
      new Paper.Point(width, height),
      new Paper.Point(0, height),
    ])

    path.closePath()

    path.smooth({
      from: 0,
      to: 4
    })

    const gradient = new Paper.Gradient()

    gradient.stops = [
      new Paper.GradientStop(colors.black, 0), 
      new Paper.GradientStop(colors.white, 1)
    ]

    const c = new Paper.Color(
      gradient,
      new Paper.Point(0, height / 2),
      new Paper.Point(0, height),
    )

    path.style.fillColor = c
    // path.strokeColor = colors.black
    // path.strokeWidth = 10
  },
};
