<h1 align="center">Draw it</h1>
<p align="center"></p>
<p align="center">https://vlsrnd.github.io/draw-it/</p>

|no pixel| 5px size| 10px size|
| :-----------: | :-----------: | :-----------: |
| <img src="https://drive.google.com/uc?export=view&id=1U3pHg7WUFphoFMk4U4EncSJBbTmd8f4a" width="240" height="135" alt="0px"> | <img src="https://drive.google.com/uc?export=view&id=19pv_NCtoRT1FDnD3ichIIg5hGvPToL-g" width="240" height="135" alt="0px"> | <img src="https://drive.google.com/uc?export=view&id=1Yjppl6LriQGS28CqYRIdFKJs3PYe_nGG" width="240" height="135" alt="0px"> |
| 280kB | 18kB | 6kB |

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

