'use strict';

const root = document.querySelector('#root');

getAverageColor = (imageData) => {
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

// const getColorMap = async (image, config, canvas) => {
//   const {imgW, imgH, imgURL} = config;
//   canvas.setAttribute('width', imgW);
//   canvas.setAttribute('height', imgH);

//   const img = new Image();
// };
