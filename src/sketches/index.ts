import { accident } from "./accident"
import { copycat } from "./copycat"
import { gradient } from "./gradient"
import { grid } from "./grid"
import { groovy } from "./groovy"
import { hex } from "./hex"
import { loop } from "./loop"
import { noise } from "./noise"
import { opus } from "./opus"
import { organic } from "./organic"
import { peaks } from "./peaks"
import { refactor } from "./refactor"
import { sharp } from "./sharp"
import { spiral } from "./spiral"
import { sunrise } from "./sunrise"
import { uncanny } from "./uncanny"
import { water } from "./water"
import { wavy } from "./wavy"

// sunrise
// opus (needs some work)
// play2 -> water (needs some work)
// mo -> ?
// allieHair -> flow?
// lines
// motion

export interface Sketch {
  name: string
  drawCanvas: (canvas: HTMLCanvasElement | null, callback?: () => void) => void
}

const sketches: Sketch[] = [
  loop,
  hex,
  water,
  sunrise,
  opus,
  uncanny,
  wavy,
  sharp,
  copycat,
  noise,
  accident,
  organic,
  groovy,
  // gradient,
  grid,
  // refactor
]

export default sketches