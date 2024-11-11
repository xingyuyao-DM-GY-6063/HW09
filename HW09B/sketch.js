let mCamera;
let blockSize = 20;

function preload() {
  mCamera = createCapture(VIDEO);
  mCamera.size(windowWidth, windowHeight);
  mCamera.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  // Load camera pixel data
  mCamera.loadPixels();

  let spacing = blockSize * 1.2; // Increase spacing
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      // Add random offsets to each square position to create a distortion effect
      let offsetX = x + random(-5, 5);
      let offsetY = y + random(-5, 5);

      // Get the colour of the current pixel block
      let i = (floor(offsetY) * mCamera.width + floor(offsetX)) * 4;
      let r = mCamera.pixels[i];
      let g = mCamera.pixels[i + 1];
      let b = mCamera.pixels[i + 2];

      // Calculate the brightness of the current pixel block
      let brightness = (r + g + b) / 3;

      // Set the size of the square according to the brightness, if the brightness is high, the square will be big, if the brightness is low, the square will be small.
      let rectSize = map(brightness, 0, 255, blockSize * 0.3, blockSize * 1.8);

      // Calculate the number of overlapping rectangles (more overlap when brightness is high)
      let overlapCount = int(map(brightness, 255, 0, 10, 1));

      // Set pink outline, no fill
      stroke(255, 105, 180);
      noFill();

      // Draw multiple overlapping small rectangles
      for (let j = 0; j < overlapCount; j++) {
        // Set random stroke weight
        strokeWeight(random(0.5, 2.5));

        // Randomised fine-tuning of positions to produce overlapping effects
        let offsetRectX = x + random(-5, 5);
        let offsetRectY = y + random(-5, 5);

        // Drawing pink rectangular outlines whose size varies with brightness
        rect(offsetRectX, offsetRectY, rectSize, rectSize);
      }
    }
  }
}
