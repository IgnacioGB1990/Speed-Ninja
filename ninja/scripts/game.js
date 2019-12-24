//Object with properties and methods

/*Declaring an object using the const keyword, means that new properties
and values can be added BUT the value of the object itself is fixed
to the same reference (address) in the memory and the object (or any
variable declared with const) can´t be reassigned.

*/
const Game = {
  //keys: values
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    TOP_KEY: [87, 38],
    RIGHT_KEY: [68, 39],
    LEFT_KEY: [65, 37]
    // SPACE: 32
  },
  score: 0,

  init: function () {
    //Creates a fixed-size drawing surface that exposes one or more rendering contexts
    //which are used to create and manipulate the content shown.
    this.canvas = document.getElementById("canvas");
    //We will do 2d rendering context. There are 4: 2D, webgl,webgl2 and bitmaprenderer
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function () {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.clear();
      this.drawAll();
      this.moveAll();
      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  },

  reset: function () {
    this.background = new Background(this.ctx, this.width, this.height);
    //Creates another object using object constructor syntax
    this.player = new Player(
      this.ctx,
      60,
      100,
      "img/player.png",
      this.width,
      this.height,
      this.playerKeys
    );
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw(this.framesCounter);
  },

  moveAll: function () {
    this.background.move();
    this.player.move();
  },

  gameOver: function () {
    clearInterval(this.interval);
  },

  startOver: function () {
    setInterval(this.interval);
  }
};
