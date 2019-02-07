let canvas;
let LENGTH = 7;
let gridScalar = 70;
let DIAM = 50
let baseX = 50;
let baseY = 50;
let circlesX = [];
let circlesY = [];
let dotsX = [];
let dotsY = [];
let dottedX = [];
let dottedY = [];
let xDots = [];
let colors = ['#EEAAAA', '#EEC5AA', '#EEE0AA', '#C5EEAA', '#AAEEC5', '#AAEEE0', '#AAE0EE']; //#EEAAAA to #AAAAEE
function setup() {
  canvas = createCanvas(500, 500);
  background(100);


  for (let i = 0; i < 7; i++) {
    circlesX.push(new Circle(baseX+gridScalar*(i+1), baseY, DIAM, colors[i]));
  }
  for (let i = 0; i < 7; i++) {
    circlesY.push(new Circle(baseX, baseY+gridScalar*(i+1), DIAM, colors[i]));
  }


  for (let i = 0; i < 7; i++) {
    dotsX.push(new Dot(baseX+gridScalar*(i+1), baseY, DIAM));
  }
  for (let i = 0; i < 7; i++) {
    dotsY.push(new Dot(baseX, baseY+gridScalar*(i+1), DIAM));
  }


  for (let i = 0; i < 7; i++) {
    dottedX.push(new DottedLine(dotsX[i].getX(), dotsX[i].getY(), canvas.height));
  }
  for (let i = 0; i < 7; i++) {
    dottedY.push(new DottedLine(dotsY[i].getX(), dotsY[i].getY(), canvas.width));
  }

  for (let i = 0; i < 7; i++) {
    let row = [];
    for (let j = 0; j < 7; j++) {
      row.push(new xDot(dotsX[i].getX(), dotsY[j].getY(), averageColor(colors[i],colors[j]),[]));
    }
    xDots.push(row);
  }
}


function draw() {
   background(100);

  for (let i = 0; i < LENGTH; i++) {
    circlesX[i].display();
    circlesY[i].display();
  }
  for (let i = 0; i < LENGTH; i++) {
    dotsX[i].move((i+2)/2);
    dotsX[i].display();

    dotsY[i].move((i+2)/2);
    dotsY[i].display();


    dottedX[i].move(dotsX[i].getX(), dotsX[i].getY());
    dottedX[i].displayX();
    dottedY[i].move(dotsY[i].getX(), dotsY[i].getY());
    dottedY[i].displayY();

    for (let j = 0; j < LENGTH; j++) {
      xDots[i][j].display();
      xDots[i][j].move(dotsX[i].getX(), dotsY[j].getY());
    }
  }
}

class Circle {
  constructor(x, y, d, c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.c = c;
  }

  getPosition() {
    return {
    x:
    this.x, y:
    this.y, diameter:
      this.d
    };
  }

  display() {
    strokeWeight(2);
    stroke(color(this.c))
      fill(100);
    ellipse(this.x, this.y, this.d, this.d);
  }
}

class Dot {
  constructor(x, y, d) {
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.d = d;
  }
  getX() {
    return this.x+(this.d/2) * cos(radians(this.angle));
  }
  getY() {
    return this.y+(this.d/2) * sin(radians(this.angle));
  }

  display() {
    strokeWeight(6);
    stroke(255);
    point((this.x+(this.d/2) * cos(radians(this.angle))), (this.y+(this.d/2) * sin(radians(this.angle))));
  }

  move(a) {
    this.angle += a;
  }
}

class xDot {
  constructor(x, y, c, h) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.h = h;
  }

  display() {
    strokeWeight(1);
    stroke(color(this.c))
    point(this.x, this.y);
  }
  move(x, y) {
    if(this.h.length == 700){
      this.h = [];
    }
    this.h.push({x: this.x, y: this.y});
    for(let i = 0 ; i < this.h.length; i++){
      point(this.h[i].x, this.h[i].y);
    }
    this.x = x;
    this.y = y;
  }
}

class DottedLine {
  constructor(p1, p2, d) {
    this.angle = 0;
    this.p1 = p1;
    this.p2 = p2;
    this.d = d;
  }

  displayX() {
    strokeWeight(1);
    stroke(200)
    for (let i = 0; i <= 100; i++) {
      let x = lerp(this.p1, this.p1, i/100.0);
      let y = lerp(this.p2, this.d, i/100.0);
      point(x, y);
    }
  }
  displayY() {
    strokeWeight(1);
    stroke(200)
    for (let i = 0; i <= 100; i++) {
      let x = lerp(this.p1, this.d, i/100.0);
      let y = lerp(this.p2, this.p2, i/100.0);
      point(x, y);
    }
  }
  move(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    point(this.p1, this.p2)
  }
}

function averageColor(color1,color2){
    var avg  = function(a,b){ return (a+b)/2; },
        t16  = function(c){ return parseInt((''+c).replace('#',''),16) },
        hex  = function(c){ var t = (c>>0).toString(16);
                           return t.length == 2 ? t : '0' + t },
        hex1 = t16(color1),
        hex2 = t16(color2),
        r    = function(hex){ return hex >> 16 & 0xFF},
        g    = function(hex){ return hex >> 8 & 0xFF},
        b    = function(hex){ return hex & 0xFF},
        res  = '#' + hex(avg(r(hex1),r(hex2)))
                   + hex(avg(g(hex1),g(hex2)))
                   + hex(avg(b(hex1),b(hex2)));
    return res;
}
