let oImg;
let mImg;
let slider;
let pImg;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
  pImg = loadImage("../assets/pumpkin.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);
  pImg.resize(907, 1000);

  oImg.loadPixels();
  pImg.loadPixels();

  slider = createSlider(0, 255);
  slider.position((height * 5) / 4, height / 2);
  slider.size(320);
}

function draw() {
  // load the pixels
  let s = slider.value();
  mImg.loadPixels();
  for (let idx = 0; idx < mImg.pixels.length; idx += 4) {
    let r = mImg.pixels[idx + 0];
    let g = mImg.pixels[idx + 1];
    let b = mImg.pixels[idx + 2];
    let a = mImg.pixels[idx + 3];

    let pixelIsR = r > 1.3 * g && r > 1.3 * b && r > 128;
    let pixelIsB = g > 1.8 * r && g > 0.4 * b && g > 50;
    let pixelIsY = r > 1.2 * b && g > 1.2 * b && r > 128 && g > 128;

    if (pixelIsR) {
      oImg.pixels[idx + 0] = 224;
      oImg.pixels[idx + 1] = 62 + s / 2;
      oImg.pixels[idx + 2] = 37;
      oImg.pixels[idx + 3] = 255 - s;
    }
    if (pixelIsB) {
      oImg.pixels[idx + 0] = 0;
      oImg.pixels[idx + 1] = 65;
      oImg.pixels[idx + 2] = 117 + s / 2;
    }
    if (pixelIsY) {
      oImg.pixels[idx + 0] = 235;
      oImg.pixels[idx + 1] = 190 - s;
      oImg.pixels[idx + 2] = 76;
    }
  }
  oImg.updatePixels(); // draw the display image

  image(pImg, 0, 0);
  image(oImg, 0, 0);
}

// TODO: do any filtering and pixel modifications here.
//       This involves a for loop of some kind.
//       Remember to read from the oImg pixels and write to the mImg.
// we'll display the updated mImg, so let's update its pixels
