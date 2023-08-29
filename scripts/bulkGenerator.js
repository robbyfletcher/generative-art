const fs = require('fs');
const puppeteer = require('puppeteer');

const NUM_SKETCHES = 10;

(async () => {
  // const sketchFiles = fs.readdirSync('../src/sketches')
  // const sketches = sketchFiles.filter(sf => sf !== 'index.ts').map(sf => sf.split('.')[0])
  const sketches = [
    'loop',
    'hex',
    'water',
    'sunrise',
    'opus',
    'uncanny',
    'wavy',
    'sharp',
    'copycat',
    'noise',
    'accident',
    'organic',
    'groovy',
    'grid'
  ]

  console.log(`Generating ${NUM_SKETCHES} of each of the following sketches: ${sketches.join(', ')}`)

  // sketches.forEach(async s => {
  for (let si = 0; si < sketches.length; si++) {
    const s = sketches[si];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 480,
      height: 640
      // width: 1040,
      // height: 1040
    })

    await page.goto(`http://localhost:3000/${s}?fullScreen=true`, { waitUntil: ["networkidle0", "domcontentloaded"] });

    for (let i = 0; i < NUM_SKETCHES; i++) {
      // await page.screenshot({ path: `dist/${s}.png` });
  
      // await page.on('domcontentloaded', async () => {
      const canvas = await page.evaluate((sketchName) => (
        document.getElementById(sketchName)
        .toDataURL()
      ), s)
    
      const dataURL = canvas.match(/^data:(.+);base64,(.+)$/)[2]  

      if (!fs.existsSync(`dist/${s}`)) {
        fs.mkdirSync(`dist/${s}`)
      }

      fs.writeFileSync(`dist/${s}/${s}_${i}.png`, Buffer.from(dataURL, 'base64'), 'base64')
      console.log(`Sketch #${i} of ${s} saved.`)

      // await page.goto(`http://localhost:3000/${s}?fullScreen=true`, { waitUntil: ["networkidle0", "domcontentloaded"] });

      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    }

    await browser.close();

    }
  // })
})();