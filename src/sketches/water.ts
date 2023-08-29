import { times } from "lodash";
import Paper from "paper";
import { Sketch } from ".";
import { blur2dArray, ColorPalette, gen2dArray, randBM, randomNumber, watercolorize } from "./utils";

export const water: Sketch = {
  name: 'water',
  drawCanvas: (canvas, callback) => {
    const canvasDim = canvas?.getBoundingClientRect();

    const dim = 5;
    const width = canvasDim?.width || 0
    const height = canvasDim?.height || 0
    const leftOffset = (width % dim) / 2;
    const topOffset = (height % dim) / 2;
    const resX = Math.floor(width / dim);
    const resY = Math.floor(height / dim);

    const colors = new ColorPalette()

    const arr = gen2dArray(resX, resY, (x, y) => randBM(0, 360) + 45) 
    const blurredArr = blur2dArray(arr, 1)

    times(40, n => {
      const heightShift = new Paper.Point(0, randomNumber(90) + 10)
  
      const pTopLeft = new Paper.Point(leftOffset, randomNumber(resY * dim) + topOffset)
      const pBottomLeft = pTopLeft.add(heightShift)
    
      const topLine = new Paper.Path([pTopLeft])
      const bottomLine = new Paper.Path([pBottomLeft])
    
      let it = pTopLeft.clone()
      let x = Math.floor(it.x / dim)
      let y = Math.floor(it.y / dim)
      let ang = 0
      let count = 0
      while ((x < resX && x >= 0) && (y < resY && y >= 0) && count < 100) {
        const shift = new Paper.Point(0, dim * 100)
        
        ang = (blurredArr[x][y])
    
        it = it.add(shift).rotate(ang, it)
        x = Math.floor(it.x / dim)
        y = Math.floor(it.y / dim)
        topLine.add(it)
        count++
      }
    
      it = pBottomLeft.clone()
      x = Math.floor(it.x / dim)
      y = Math.floor(it.y / dim)
      ang = 0
      count = 0
      while ((x < resX && x >= 0) && (y < resY && y >= 0) && count < 100) {
        const shift = new Paper.Point(0, dim * 100)
        
        ang = (blurredArr[x][y])
    
        it = it.add(shift).rotate(ang, it)
        x = Math.floor(it.x / dim)
        y = Math.floor(it.y / dim)
        bottomLine.add(it)
        count++
      }
      bottomLine.reverse()
    
      const line = new Paper.Path([...topLine.segments, ...bottomLine.segments])
      line.closePath()
    
      line.style.fillColor = colors.getRandomColor()
      watercolorize(line, 30)

      callback && callback()
    })
  }
}