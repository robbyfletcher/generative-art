import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { ColorPalette } from "./utils";

export const sunrise: Sketch = {
  name: 'sunrise',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const width = canvasDim?.width || 0;
    const height = canvasDim?.height || 0;
    const dim = width < height ? (width * 4) / 10 : (height * 4) / 10;
    const segments = 4;

    const colors = new ColorPalette()

    new Paper.Path.Rectangle({
      point: [0, 0],
      size: [width, height],
      fillColor: "#fff",
    });

    const top: paper.Path.Circle[] = [];
    times(segments, (i) => {
      const p = new Paper.Point(
        width / 2 + (dim / segments) * (segments - 1 - i),
        height / 2
      );

      const c = new Paper.Path.Circle(p, (dim / segments) * (i + 1));
      c.style.fillColor = colors.colors[colors.colors.length - 1]
      c.style.fillColor.alpha = 1 / segments;

      top.push(c);
    });
    const topMask = new Paper.Path.Rectangle(
      new Paper.Point(0, 0),
      new Paper.Point(width, height / 2)
    );

    const topGroup = new Paper.Group([topMask, ...top]);
    topGroup.clipped = true;

    const bottom: paper.Path.Circle[] = [];
    times(segments, (i) => {
      const p = new Paper.Point(
        width / 2 - (dim / segments) * (segments - 1 - i),
        height / 2
      );

      const c = new Paper.Path.Circle(p, (dim / segments) * (i + 1));
      c.style.fillColor = colors.colors[0];
      c.style.fillColor.alpha = 1 / segments;

      bottom.push(c);
    });

    const bottomMask = new Paper.Path.Rectangle(
      new Paper.Point(0, height / 2),
      new Paper.Point(width, height)
    );

    const bottomGroup = new Paper.Group([bottomMask, ...bottom]);
    bottomGroup.clipped = true;
  }
}
