'use strict';
const root = document.querySelector('#root');

// drawIt(config, canvas);
class Particle {
  constructor(canvas, speed) {
    this.canvas = canvas;
    this.x = this.random(0, canvas.width);
    this.y = this.random(0, canvas.height);
    this.directionAngle = this.random(0, 359);
    this.speed = this.random(speed[0], speed[1]);
  }
  random = (min, max) => {
    Math.floor(Math.random() * (max - min) + min);
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
}

class PixelPicture {
  constructor({
    imgURL,
    imgW = 480,
    imgH = 270,
    pixelSize = 5,
    drawAnimationMode = true,
    particlesCount = 500,
    particlesRadius = 2,
    particlesOutline = false,
    particlesTailLength = 1000,
    particlesSpeed = [1, 5],
  }, destination) {
    this.imgURL = imgURL;
    this.imgW = imgW;
    this.imgH = imgH;
    this.pixelSize = pixelSize;
    this.drawAnimationMode = drawAnimationMode;
    this.particlesCount = particlesCount;
    this.particlesRadius = particlesRadius;
    this.particlesOutline = particlesOutline;
    this.particlesTailLength = particlesTailLength;
    this.particlesSpeed = particlesSpeed;
    this.destination = destination;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.destination.append(this.canvas);

    this.image = new Image();
    this.image.src = this.imgURL;
    this.image.onload = this.onloadImgCreator;
    // this.mediaQuery = mediaQuery;
  }
  onloadImgCreator = (event) => {
    // debugger
    this.canvas.setAttribute('width', this.imgW);
    this.canvas.setAttribute('height', this.imgH);

    this.ctx.drawImage(event.currentTarget, 0, 0, this.imgW, this.imgH);
    for (let y = 0; y < this.imgH / this.pixelSize; y++) {
      for (let x = 0; x < this.imgW / this.pixelSize; x++) {
        const xyWH = [
          x * this.pixelSize,
          y * this.pixelSize,
          Math.min(this.pixelSize, this.imgW - x * this.pixelSize),
          Math.min(this.pixelSize, this.imgH - y * this.pixelSize)
        ];
        const imageData = this.ctx.getImageData(...xyWH);
        this.ctx.fillStyle = this.getAverageColor(imageData);
        this.ctx.fillRect(...xyWH);
      }
    }
    const colorMaskImageData = this.ctx.getImageData(0, 0, this.imgW, this.imgH);
    this.colorMask = {};
    this.drawAnimationMode && this.ctx.clearRect(0, 0, this.imgW, this.imgH);
    for (let y = 0; y < this.imgH; y++) {
      for (let x = 0; x < this.imgW; x++) {
        const r = colorMaskImageData.data[((x + (y * this.imgW)) * 4) + 0];
        const g = colorMaskImageData.data[((x + (y * this.imgW)) * 4) + 1];
        const b = colorMaskImageData.data[((x + (y * this.imgW)) * 4) + 2];
        const a = colorMaskImageData.data[((x + (y * this.imgW)) * 4) + 3];
        this.colorMask[`x${x}y${y}`] = `rgba(${r}, ${g}, ${b}, ${a})`;
      }
    }
    this.drawAnimationMode && this.animation();
  }

  getAverageColor = (imageData) => {
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
  }

  animation = () => {
    this.particles = [];
    for (let i = 0; i < this.particlesCount; i++) {
      this.particles.push(new Particle(this.canvas, this.particlesSpeed));
    }

    const tik = () => {
      this.ctx.fillStyle = (`rgba(255,255,255, ${1 / this.particlesTailLength}`);
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(particle => {
        this.ctx.beginPath();
        const x = Math.round(particle.x);
        const y = Math.round(particle.y);
        this.ctx.fillStyle = this.colorMask[`x${x}y${y}`];
        particle.addToCanvas(this.particlesRadius, this.ctx);
        particle.step();
        this.ctx.closePath();
        this.ctx.fill();
        this.particlesOutLine && this.ctx.stroke();
      });

      requestAnimationFrame(tik);
    };
    window.requestAnimationFrame(tik);
  }
}

const config = {
  imgW: 480,
  imgH: 270,
  imgURL: './img/elbrus.jpg',
  pixelSize: 5,
  drawAnimationMode: true,
  particlesCount: 50,
  particlesRadius: 2,
  particlesOutLine: false,
  particlesTailLength: 1000,
  particlesSpeed: [1, 5],
};
const newImage = new PixelPicture(config, root);