class Player {
  constructor(ctx, width, height, image, gameWidth, gameHeight, keys) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    /* new keyword:
     1. Creates a blank, plain JavaScript object;
     2. Links (sets the constructor of) this object to another object;
     4. Returns this if the function doesn´t return its own object.
     */

    this.image = new Image();
    this.image.src = image;

    this.posX = 80; //Starting position
    this.posY = gameHeight * 0.88 - this.height; //Starting Y this.height =100 Se lo indicaste tu
    this.posY0 = gameHeight * 0.88 - this.height; //Posicion de suelo por defecto
    this.vy = 1;
    console.log(gameHeight);
    this.gravity = 0.6; //How high player can jump. The lower the more he can jump
    this.gameWidth = gameWidth;

    this.frames = 6; // Number of images in source image
    this.framesIndex = 10;

    this.keys = keys;
    this.bullets = [];
    this.setListeners();
  }

  draw(framesCounter) {
    // s: source image  d:destination canvas
    //ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth)
    //console.log("Ninja is positioned in X", this.posX);
    //console.log("this.width", this.width);
    //console.log("Ninja is positioned in Y", this.posY);

    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames), 0,
      Math.floor(this.image.width / this.frames), this.image.height,
      this.posX, this.posY, this.width, this.height
    );
    this.animate(framesCounter);
  }

  /*
  - El framesCounter va sumando de uno en uno
  - El frameIndex tiene un valro inicial de  10?? 
    Su comportamiento basicamente es un loop entre el número de imagenes
    que nos interesa ir mostrando. En este caso 6.
  
  - Cuando es multiplo de 8 incrementamos el framesIndex en una unidad = 11
  */
  animate(framesCounter) {
    console.log("Este es el frame counter", framesCounter);
    console.log("Este es el frame Index inicial: ", this.framesIndex);
    if (framesCounter % 8 === 0) {
      //Displays 10 times each of the 3 images. How fast a player seems to move.
      this.framesIndex++;
      console.log(
        "Este es el frame Index cuando se cumple la condicion",
        this.framesIndex
      );
      console.log("FramesIndex antes de segundo if", this.framesIndex)
      if (this.framesIndex > 5) this.framesIndex = 0;
      console.log("FramesIndex DESPUES de segundo if", this.framesIndex)
      ////Since we have 3 images when it reaches 3 (>2) we tell him to start again in sx=0
    }
  }

  move() {
    if (this.posY <= this.posY0) {
      this.posY += this.vy;
      this.vy += this.gravity;
    } else {
      this.vy = 1;
      this.posY = this.posY0;
    }
  }

  speed(xforce) {
    this.posX += xforce * 7;
  }

  setListeners() {
    var xforce = 0;
    let right = false;
    let left = false;
    document.addEventListener("keydown", e => {
      //GO UP
      if (
        e.keyCode === this.keys.TOP_KEY[0] || e.keyCode === this.keys.TOP_KEY[1]) {
        if (this.posY >= this.posY0) {
          this.posY -= this.vy;
          this.vy -= 18;
          console.log(this.posY);
        } else if (this.posY >= this.height / 3) {
          console.log(this.height);
          this.posY = this.height / 0.4;
        }
        //GO RIGHT
      } else if (
        e.keyCode === this.keys.RIGHT_KEY[0] || e.keyCode === this.keys.RIGHT_KEY[1]) {
        console.log("right");
        xforce++;
        right = true;

        this.speed(xforce);
        //GO LEFT
      } else if (
        e.keyCode === this.keys.LEFT_KEY[0] || e.keyCode === this.keys.LEFT_KEY[1]) {
        xforce--;
        this.posX -= 1;
        this.speed(xforce);
      }
    });

    document.addEventListener("keyup", e => {
      //GO RIGHT
      if (
        e.keyCode === this.keys.RIGHT_KEY[0] ||
        e.keyCode === this.keys.RIGHT_KEY[1]
      ) {
        xforce = 0;
        console.log("Out of RIGHT");
        //GO LEFT
      } else if (
        e.keyCode === this.keys.LEFT_KEY[0] ||
        e.keyCode === this.keys.LEFT_KEY[1]
      ) {
        console.log("OUT OF LEFT");
        xforce = 0;
      }
    });
  }
}
