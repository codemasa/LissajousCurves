let canvas;
let slider;
let LENGTH = 10;
let DIAM = 50
let MARGIN = 10;
let gridScalar = DIAM+MARGIN;
let baseX = DIAM/2+MARGIN;
let baseY = DIAM/2+MARGIN;
let circlesX = [];
let circlesY = [];
let dotsX = [];
let dotsY = [];
let dottedX = [];
let dottedY = [];
let xDots = [];
let colors = ['#EEAAAA', '#EEC5AA', '#EEE0AA', '#E0EEAA', '#C5EEAA', '#AAEEAA', '#AAEEC5', '#AAEEE0', '#AAE0EE', '#AAC5EE']; //#EEAAAA to #AAAAEE
function setup() {
  slider = createSlider(0,10,0);
  canvas = createCanvas((DIAM+MARGIN) * (10 + 1) + 2*MARGIN + slider.width, (DIAM+MARGIN) * (10 + 1) + MARGIN);
  slider.position(canvas.height, canvas.height - slider.height*2);
  for (let i = 0; i < LENGTH; i++) {
    circlesX.push(new Circle(baseX+gridScalar*(i+1), baseY, DIAM, colors[i%10]));
  }
  for (let i = 0; i < LENGTH; i++) {
    circlesY.push(new Circle(baseX, baseY+gridScalar*(i+1), DIAM, colors[i%10]));
  }


  for (let i = 0; i < LENGTH; i++) {
    dotsX.push(new Dot(baseX+gridScalar*(i+1), baseY, DIAM));
  }
  for (let i = 0; i < LENGTH; i++) {
    dotsY.push(new Dot(baseX, baseY+gridScalar*(i+1), DIAM));
  }


  for (let i = 0; i < LENGTH; i++) {
    dottedX.push(new DottedLine(dotsX[i].getX(), dotsX[i].getY(), canvas.height));
  }
  for (let i = 0; i < LENGTH; i++) {
    dottedY.push(new DottedLine(dotsY[i].getX(), dotsY[i].getY(), canvas.width));
  }

  for (let i = 0; i < LENGTH; i++) {
    let row = [];
    for (let j = 0; j < LENGTH; j++) {
      row.push(new xDot(dotsX[i].getX(), dotsY[j].getY(), averageColor(colors[i%10],colors[j%10]),[]));
    }
    xDots.push(row);
  }
}


function draw() {
  background(100);
  stroke(255);
  textSize(50);
  fill(100)
  strokeWeight(6);
  text(slider.value(), canvas.height + 5, canvas.height-50)

  for (let i = 0; i < LENGTH; i++) {
    dotsX[i].move((i+1)/2);
    dotsY[i].move((i+1)/2);
    dottedX[i].move(dotsX[i].getX(), dotsX[i].getY());
    dottedY[i].move(dotsY[i].getX(), dotsY[i].getY());

    for (let j = 0; j < LENGTH; j++) {
      xDots[i][j].move(dotsX[i].getX(), dotsY[j].getY());
    }
  }
  for (let i = 0; i < slider.value(); i++) {
    circlesX[i].display();
    circlesY[i].display();
  }

  for (let i = 0; i < slider.value(); i++) {
    dotsX[i].display();
    dotsY[i].display();
    dottedX[i].displayX();
    dottedY[i].displayY();

    for (let j = 0; j < slider.value(); j++) {
      xDots[i][j].drawTail();
      xDots[i][j].display();
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
    strokeWeight(7);
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
    strokeWeight(4);
    stroke(255)
    point(this.x, this.y);

  }
  drawTail(){
    for(let i = 0 ; i < this.h.length; i++){
      strokeWeight(3);
      stroke(color(this.c))
      point(this.h[i].x, this.h[i].y);
    }
  }
  move(x, y) {
    this.h.push(createVector(this.x,this.y));
    if(this.h.length > 720){
      this.h = [];
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
