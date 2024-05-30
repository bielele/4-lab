class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx) {
    // Метод для малювання фігури (реалізується в дочірніх класах)
  }
}

class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Ellipse extends Shape {
  constructor(x, y, color, radiusX, radiusY) {
    super(x, y, color);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Triangle extends Shape {
  constructor(x, y, color, size) {
    super(x, y, color);
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Canvas {
  constructor(canvasId) {
    this.canvas = document.querySelector(`#${canvasId}`);
    this.ctx = this.canvas.getContext("2d");
    this.shapes = [];

    this.canvas.addEventListener(
      "contextmenu",
      this.handleContextMenu.bind(this)
    );
  }

  handleContextMenu(event) {
    event.preventDefault();
    const { offsetX: x, offsetY: y } = event;
    this.addRandomShape(x, y);
  }

  addRandomShape(x, y) {
    const shapeType = Math.floor(Math.random() * 3);
    const color = this.getRandomColor();

    switch (shapeType) {
      case 0:
        const radius = Math.floor(Math.random() * 50) + 10;
        this.shapes.push(new Circle(x, y, color, radius));
        break;
      case 1:
        const radiusX = Math.floor(Math.random() * 50) + 10;
        const radiusY = Math.floor(Math.random() * 50) + 10;
        this.shapes.push(new Ellipse(x, y, color, radiusX, radiusY));
        break;
      case 2:
        const size = Math.floor(Math.random() * 50) + 10;
        this.shapes.push(new Triangle(x, y, color, size));
        break;
    }

    this.drawShapes();
  }

  drawShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => shape.draw(this.ctx));
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

const canvas = new Canvas("myCanvas");
