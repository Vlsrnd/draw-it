'use strict';

const root = document.querySelector('#root');
const canvas = document.createElement('canvas');
root.append(canvas);

const animation = (config, colorMask) => {
  const {
    canvas,
    particlesCount = 1500,
    particlesRadius = 3,
    particlesOutLine = false,
    particlesTailLength = 100,
    particlesSpeed = [1, 5]
  } = config;

  const ctx = canvas.getContext('2d');
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = random(0, canvas.width);
      this.y = random(0, canvas.height);
      this.directionAngle = random(0, 359);
      this.speed = random(particlesSpeed[0], particlesSpeed[1]);
    }
    addToCanvas = (radius, canvasContext) => {
      canvasContext.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    }
    step = () => {
      const angleInRadian = this.directionAngle * Math.PI / 180;
      this.x += this.speed * Math.cos(angleInRadian);
      this.y -= this.speed * Math.sin(angleInRadian);
      if (this.x >= this.canvas.width || this.x <= 0) this.directionAngle = 180 - this.directionAngle;
      if (this.y >= this.canvas.height || this.y <= 0) this.directionAngle = 360 - this.directionAngle;
    }
  };

  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle(canvas));
  }

  const tik = () => {
    ctx.fillStyle = (`rgba(255,255,255, ${1 / particlesTailLength}`);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      ctx.beginPath();
      const x = Math.round(particle.x);
      const y = Math.round(particle.y);
      ctx.fillStyle = colorMask[`x${x}y${y}`];
      particle.addToCanvas(particlesRadius, ctx);
      particle.step();
      ctx.closePath();
      ctx.fill();
      particlesOutLine && ctx.stroke();
    })

    requestAnimationFrame(tik);
  };
  window.requestAnimationFrame(tik);
};

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

const drawIt = (config) => {
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
    drawAnimationMode && animation(config, colorMask);
  };

  img.onload = onLoadCreator(config);

};

const config = {
  imgW: 480,
  imgH: 270,
  imgURL: './img/elbrus.jpg',
  pixelSize: 5,
  drawAnimationMode: true,
  canvas: canvas,
  particlesCount: 500,
  particlesRadius: 2,
  particlesOutLine: false,
  particlesTailLength: 1000,
  particlesSpeed: [1, 5],
};

drawIt(config, canvas);