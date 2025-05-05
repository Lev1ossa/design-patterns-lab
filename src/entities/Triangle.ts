import { Point2D } from './Point2D';
import { Shape } from './Shape';

function distance(a: Point2D, b: Point2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export class Triangle extends Shape {
  private constructor(
    name: string,
    public p1: Point2D,
    public p2: Point2D,
    public p3: Point2D,
  ) {
    super(name);
  }

  static create(name: string, p1: Point2D, p2: Point2D, p3: Point2D): Triangle {
    return new Triangle(name, p1, p2, p3);
  }

  getArea(): number {
    const a = distance(this.p1, this.p2);
    const b = distance(this.p2, this.p3);
    const c = distance(this.p3, this.p1);
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  getPerimeter(): number {
    return distance(this.p1, this.p2) + distance(this.p2, this.p3) + distance(this.p3, this.p1);
  }

  isValid(): boolean {
    return this.getArea() > 0;
  }

  isRight(): boolean {
    const sides = [
      distance(this.p1, this.p2),
      distance(this.p2, this.p3),
      distance(this.p3, this.p1),
    ].sort((a, b) => a - b);
    return Math.abs(sides[0] ** 2 + sides[1] ** 2 - sides[2] ** 2) === 0;
  }

  isEquilateral(): boolean {
    const [a, b, c] = [
      distance(this.p1, this.p2),
      distance(this.p2, this.p3),
      distance(this.p3, this.p1),
    ];
    return Math.abs(a - b) === 0 && Math.abs(b - c) === 0;
  }

  isIsosceles(): boolean {
    const [a, b, c] = [
      distance(this.p1, this.p2),
      distance(this.p2, this.p3),
      distance(this.p3, this.p1),
    ];
    return Math.abs(a - b) === 0 || Math.abs(b - c) === 0 || Math.abs(c - a) === 0;
  }
}
