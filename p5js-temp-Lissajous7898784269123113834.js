let circle;
let dot;
function setup() {
  circle = new Circle(50,50,80,80);
  dot = new Dot(50,50,80);
}


function draw() {
  circle.display();
  dot.move(2);
  dot.display();

}

class Circle{
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  
  getPosition(){
    return {x: this.x, y: this.y, diameter: this.d};
  }
  
  display(){
    strokeWeight(2);
    ellipse(this.x, this.y, this.d, this.d);
  }
}

class Dot{
  constructor(x,y,d){
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.d = d;
  }
  
  display(){
    strokeWeight(6);
    point((this.x+(this.d/2) * cos(radians(this.angle))), (this.y+(this.d/2) * sin(radians(this.angle))));
  }
  
  move(a){
    this.angle += a;
  }
  
}
