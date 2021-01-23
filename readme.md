<h1 align="center">Draw it</h1>
<p align="center"></p>
<p align="center">https://vlsrnd.github.io/draw-it/</p>

|no pixel| 5px size| 10px size|
| :-----------: | :-----------: | :-----------: |
| <img src="https://i.ibb.co/kXw1LcF/pixel-no.png" width="240" height="135" alt="0px"> | <img src="https://i.ibb.co/sb9gR8d/pixel-5.png" width="240" height="135" alt="0px"> | <img src="https://i.ibb.co/vB7pCBb/pixel-10.png" width="240" height="135" alt="0px"> |
| 280kB | 18kB | 6kB |

<p><img src="https://i.ibb.co/19Lv2nN/1.gif" width="360" height="202" alt="gif"></p>
<p>How to use:</p>
<p>create new instance of class PixelPicture with first argument</p>

```
config = {
  imgW: number, //image width
  imgH: number, //image height
  imgURL: string, //URL to image. don't forget CORS
  pixelSize: number,  //pixel size
  drawAnimationMode: bool, //if false just pixelize without animation
  particlesCount: number, //count of particles
  particlesRadius: number, //radius of particles
  particlesOutLine: bool, //will be particles have a outline (stroke in canvas)
  particlesTailLength: number,  //lenght of particle tail
  particlesSpeed: [min: number, max: number], //min/max speed
};
```

<p>and second argument is an element where you want to append canvas</p>

