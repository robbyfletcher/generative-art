import { times } from "lodash";
import Paper from "paper";

const colorPalettes = [
  ["#ffa630","#d7e8ba","#4da1a9","#2e5077","#611c35"],
  ["#002626","#0e4749","#95c623","#e55812","#efe7da"],
  ["#db504a","#ff6f59","#254441","#43aa8b","#b2b09b"],
  ["#ede3e4","#e7dfe8","#e4dee4","#af9fa5","#92898a"],
  ["#2b061e","#875053","#d2bf55","#ffeed6","#fbbfca"],
  ["#a09abc","#b6a6ca","#d5cfe1","#e1dee9","#d4bebe"],
  ["#a09abc","#b6a6ca","#52796f","#e1dee9","#37323e"],
  ["#ccc9a1","#a5d8ff","#a53f2b","#4c230a","#280004"],
  ["#cbbaed","#26ffe6","#461220","#f97924","#5e959f"],
  ["#8b1e3f","#3c153b","#89bd9e","#f0c987","#db4c40"],
  ["#26532b","#399e5a","#5abcb9","#63e2c6","#6ef9f5"],
  ["#f75c03","#d90368","#820263","#291720","#04a777"],
  ["#dd1c1a","#d6ba73","#8bbf9f","#809bce","#59344f"],
  ["#8eb8e5","#7c99b4","#6b7f82","#5b5750","#492c1d"],
  ["#011627","#9c7ca5","#2ec4b6","#e71d36","#ff9f1c"],
  ["#565264","#706677","#a6808c","#ccb7ae","#d6cfcb"],
  ["#222e50","#007991","#439a86","#bcd8c1","#e9d985"],
  ["#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c"],
  ["#594b82","#432d85","#38207d","#1e085e","#0d0130"]
]

export const seededRandom = (seed: number, max: number): number => {
  var t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const r = ((t ^ t >>> 14) >>> 0) / 4294967296;
  return Math.floor(max * r);
}

export const randomNumber = (max: number): number => Math.floor(max * Math.random());

export const randBM = (min: number = 0, max: number = 1, skew: number = 1) => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random()
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = randBM(min, max, skew) // resample between 0 and 1 if out of range
  
  else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}

export class ColorPalette {
  colors: paper.Color[]

  constructor(colorPalette?: string[]) {
    const palette = colorPalette || colorPalettes[randomNumber(colorPalettes.length)]
    this.colors = palette
      .map(c => new Paper.Color(c))
      .sort((a, b) => (a.lightness > b.lightness) ? 1 : -1)
  }

  get black() {
    return new Paper.Color('#000')
  }

  get white() {
    return new Paper.Color('#fff')
  }

  get red() {
    return new Paper.Color('#f00')
  }

  get green() {
    return new Paper.Color('#0f0')
  }

  get blue() {
    return new Paper.Color('#00f')
  }

  getRandomColor() {
    return this.colors[randomNumber(this.colors.length)]
    // return this.colors[randBM(this.colors.length)]
  }
}

export const gen2dArray = <T>(
  x: number,
  y: number,
  cb: (i: number, j: number) => T
) =>
  Array(x)
    .fill(0)
    .map((_, i) =>
      Array(y)
        .fill(0)
        .map((_, j) => cb && cb(i, j))
    );

export const blur2dArray = (arr: number[][], blurAmount: number = 1) => (
  arr.map((v: number[], x: number, xArr: number[][]) => (
    v.map((_: number, y:number) => {
      const xInd = (x - blurAmount) < 0 ? 0 : (x - blurAmount)
      const yInd = (y - blurAmount) < 0 ? 0 : (y - blurAmount)

      const flattenedArr = xArr.slice(xInd, x + blurAmount * 2).map(e => e.slice(yInd, y + blurAmount * 2)).flat()
      return flattenedArr.reduce((prev, cur) => prev + cur, xArr[x][y]) / flattenedArr.length
    })
  ))
)

export const deformPolygon = (polygon: paper.Path, deformation: number = 50) => {
  for (let i = 0; i < polygon.segments.length; i++) {
    const p0 = polygon.segments[i].point
    const p1 = polygon.segments[(i + 1) % polygon.segments.length].point

    const randX = randBM(0, deformation * 2) - deformation
    const randY = randBM(0, deformation * 2) - deformation

    const newPoint = new Paper.Point(
      (p0.x + p1.x) / 2 + randX,
      (p0.y + p1.y) / 2 + randY
    )

    polygon.insert(++i, newPoint)
  }
}

export const watercolorize = (polygon: paper.Path, iterations: number = 30, deformation: number = 100, baseTransparency = 0.2) => {
  const wc = new Paper.Group()
  times(iterations, () => {
    const poly = polygon.clone()
    times(7, () => deformPolygon(poly, deformation))
  
    if (poly.style.fillColor) poly.style.fillColor.alpha = baseTransparency / iterations
    wc.addChild(poly)
  })

  if (iterations > 0) polygon.visible = false

  return wc
}