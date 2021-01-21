'use strict';

const root = document.querySelector('#root');

const getAverageColor = (imageData) => {
  const average = (arr) => arr.reduce((acc, elem) => acc + elem) / arr.length;
  const r = [];
  const g = [];
  const b = [];
  const a = [];
  for (let x = 0; x < imageData.data.length / 4; x++) {
    r.push(imageData.data[(x * 4) + 0]);
    g.push(imageData.data[(x * 4) + 1]);
    b.push(imageData.data[(x * 4) + 2]);
    a.push(imageData.data[(x * 4) + 3]);
  }
  return `rgba(${average(r)}, ${average(g)}, ${average(b)}, ${average(a)})`;
};

const canvas = document.createElement('canvas');
root.append(canvas);

const getColorMap = (config) => {
  const img = new Image();
  img.src = config.imgURL;

  const onLoadCreator = (config) => (event) => {
    const {
      imgW,
      imgH,
      pixelSize,
      drawAnimationMode,
      canvas
    } = config;
    const ctx = canvas.getContext('2d');

    canvas.setAttribute('width', imgW);
    canvas.setAttribute('height', imgH);

    ctx.drawImage(event.currentTarget, 0, 0, imgW, imgH);
    for (let y = 0; y < imgH / pixelSize; y++) {
      for (let x = 0; x < imgW / pixelSize; x++) {
        const xyWH = [
          x * pixelSize,
          y * pixelSize,
          Math.min(pixelSize, imgW - x * pixelSize),
          Math.min(pixelSize, imgH - y * pixelSize)
        ];
        const imageData = ctx.getImageData(...xyWH);
        ctx.fillStyle = getAverageColor(imageData);
        ctx.fillRect(...xyWH);
      }
    }

    const colorMaskImageData = ctx.getImageData(0, 0, imgW, imgH);
    const colorMask = {};
    drawAnimationMode && ctx.clearRect(0, 0, imgW, imgH);
    for (let y = 0; y < imgH; y++) {
      for (let x = 0; x < imgW; x++) {
        const r = colorMaskImageData.data[((x + (y * imgW)) * 4) + 0];
        const g = colorMaskImageData.data[((x + (y * imgW)) * 4) + 1];
        const b = colorMaskImageData.data[((x + (y * imgW)) * 4) + 2];
        const a = colorMaskImageData.data[((x + (y * imgW)) * 4) + 3];
        colorMask[`x${x}y${y}`] = `rgba(${r}, ${g}, ${b}, ${a})`;
      }
    }
  };

  img.onload = onLoadCreator(config);

};

const config = {
  imgW: 480,
  imgH: 270,
  imgURL: './img/elbrus.jpg',
  pixelSize: 10,
  drawAnimationMode: false,
  canvas: canvas,
}
getColorMap(config, canvas);