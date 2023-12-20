import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "./types";

export class Circle {
  constructor(
    private x: number,
    private y: number,
    private radius = 7,
    private color: Color | number = 50
  ) {}

  public isClicked(x: number, y: number) {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }

  public changeColor(color: number | Color) {
    this.color = color;
  }

  public draw(p5: P5CanvasInstance) {
    if (Array.isArray(this.color)) {
      p5.fill(this.color[0], this.color[1], this.color[2]);
    } else {
      p5.fill(this.color);
    }

    // console.log(this.x, this.y, this.radius);
    p5.circle(this.x, this.y, this.radius);
  }
}

export class Row {
  constructor(
    private yPosition = 1,
    private xPositions = [1, 2],
    private gridWidth = 10,
    private color: number | Color = 255,
    private circles: Circle[] = []
  ) {
    this.circles = xPositions.map(
      (xPosition) =>
        new Circle(
          xPosition,
          this.yPosition * this.gridWidth,
          undefined,
          this.color
        )
    );
  }

  public draw(p5: P5CanvasInstance) {
    this.circles.forEach((circle) => {
      circle.draw(p5);
    });
  }

  public getCircles() {
    return this.circles;
  }
}
