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

  // 加载摄像头像素数据
  mCamera.loadPixels();

  // 遍历每个像素块，增加间距
  let spacing = blockSize * 1.2; // 增加间距
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {

      // 为每个方块位置随机添加偏移，制造失真效果
      let offsetX = x + random(-5, 5);
      let offsetY = y + random(-5, 5);

      // 获取当前像素块的颜色
      let i = (floor(offsetY) * mCamera.width + floor(offsetX)) * 4;
      let r = mCamera.pixels[i];
      let g = mCamera.pixels[i + 1];
      let b = mCamera.pixels[i + 2];

      // 计算当前像素块的亮度
      let brightness = (r + g + b) / 3;

      // 根据亮度设置方块大小，亮度高则方块大，亮度低则方块小
      let rectSize = map(brightness, 0, 255, blockSize * 0.3, blockSize * 1.8);

      // 计算重叠矩形的数量（亮度高时重叠更多）
      let overlapCount = int(map(brightness, 255, 0, 10, 1));

      // 设置粉色轮廓，无填充
      stroke(255, 105, 180);
      noFill();

      // 绘制多个重叠的小矩形
      for (let j = 0; j < overlapCount; j++) {
        // 设置随机的描边粗细
        strokeWeight(random(0.5, 2.5));
        
        // 随机微调位置，产生重叠效果
        let offsetRectX = x + random(-5, 5);
        let offsetRectY = y + random(-5, 5);

        // 绘制大小随亮度变化的粉色矩形轮廓
        rect(offsetRectX, offsetRectY, rectSize, rectSize);
      }
    }
  }
}
