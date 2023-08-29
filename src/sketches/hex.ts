import Paper from 'paper';
import { Sketch } from '.';
import { ColorPalette } from './utils';

const c30 = Math.cos(Math.PI * 30 / 180)
const c60 = Math.cos(Math.PI * 60 / 180)

const genStyle = (color: paper.Color) => {
  const s = new Paper.Style({
    fillColor: color
  })
  
  if (s.fillColor) s.fillColor.alpha = 0.4
  return s
}

const hexagon = (point: paper.Point, dim: number) => new Paper.Path.RegularPolygon(
  point,
  6,
  dim
)

const splitHexagon = (centerPoint: paper.Point, radius: number, count: number, colors: ColorPalette) => {
  if (count !== 0) {
    const idxDim = radius * (2 / 3)

    const c = hexagon(centerPoint, idxDim)
    c.style = genStyle(colors.getRandomColor())
    splitHexagon(centerPoint, idxDim, count - 1, colors)
    
    const lcp = centerPoint.clone()
    lcp.x -= c30 * 2 * idxDim
    const lc = hexagon(lcp, idxDim)
    lc.style = genStyle(colors.getRandomColor())
    splitHexagon(lcp, idxDim, count - 1, colors)
  
    const rcp = centerPoint.clone()
    rcp.x += c30 * 2 * idxDim
    const rc = hexagon(rcp, idxDim)
    rc.style = genStyle(colors.getRandomColor())
    splitHexagon(rcp, idxDim, count - 1, colors)
  
    const ltp = centerPoint.clone()
    ltp.x -= c30 * idxDim
    ltp.y -= c60 * 3 * idxDim
    const lt = hexagon(ltp, idxDim)
    lt.style = genStyle(colors.getRandomColor())
    splitHexagon(ltp, idxDim, count - 1, colors)
  
    const lbp = centerPoint.clone()
    lbp.x -= c30 * idxDim
    lbp.y += c60 * 3 * idxDim
    const lb = hexagon(lbp, idxDim)
    lb.style = genStyle(colors.getRandomColor())
    splitHexagon(lbp, idxDim, count - 1, colors)
  
    const rtp = centerPoint.clone()
    rtp.x += c30 * idxDim
    rtp.y -= c60 * 3 * idxDim
    const rt = hexagon(rtp, idxDim)
    rt.style = genStyle(colors.getRandomColor())
    splitHexagon(rtp, idxDim, count - 1, colors)
  
    const rbp = centerPoint.clone()
    rbp.x += c30 * idxDim
    rbp.y += c60 * 3 * idxDim
    const rb = hexagon(rbp, idxDim)
    rb.style = genStyle(colors.getRandomColor())
    splitHexagon(rbp, idxDim, count - 1, colors)

  }
}

export const hex: Sketch = {
  name: 'hex',
  drawCanvas: (canvas) => {
    const canvasDim = canvas?.getBoundingClientRect();
  
    const width = canvasDim?.width || 0
    const height = canvasDim?.height || 0
    const dimRatio = 0.5
    const dim = width < height ? width * dimRatio : height * dimRatio

    const colors = new ColorPalette()
  
    new Paper.Path.Rectangle({
      point: [0, 0],
      size: [width, height],
      fillColor: '#fff'
    })
  
    const centerPoint = new Paper.Point(width / 2, height / 2)
  
    const hex = hexagon(centerPoint, dim)
    hex.style = genStyle(colors.getRandomColor())
  
    splitHexagon(centerPoint, dim, 2, colors)
  }
}