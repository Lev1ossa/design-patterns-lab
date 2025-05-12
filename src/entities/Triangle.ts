import { Point2D } from './Point2D';
import { Shape } from './Shape';
import { Warehouse } from '../warehouse/Warehouse';

function distance(a: Point2D, b: Point2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export class Triangle extends Shape {
  private _p1: Point2D;

  private _p2: Point2D;

  private _p3: Point2D;

  get p1() {
    return this._p1;
  }

  set p1(val: Point2D) {
    this._p1 = val;
    this.notifyObservers(this.name, this);
  }

  get p2() {
    return this._p2;
  }

  set p2(val: Point2D) {
    this._p2 = val;
    this.notifyObservers(this.name, this);
  }

  get p3() {
    return this._p3;
  }

  set p3(val: Point2D) {
    this._p3 = val;
    this.notifyObservers(this.name, this);
  }

  private constructor(name: string, p1: Point2D, p2: Point2D, p3: Point2D) {
    super(name);
    this._p1 = p1;
    this._p2 = p2;
    this._p3 = p3;
    this.addObserver(Warehouse.getInstance());
    this.notifyObservers(this.name, this);
  }

  static create(name: string, p1: Point2D, p2: Point2D, p3: Point2D): Triangle {
    return new Triangle(name, p1, p2, p3);
  }

  getArea(): number {
    const a = distance(this._p1, this._p2);
    const b = distance(this._p2, this._p3);
    const c = distance(this._p3, this._p1);
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  getPerimeter(): number {
    return (
      distance(this._p1, this._p2) + distance(this._p2, this._p3) + distance(this._p3, this._p1)
    );
  }

  isValid(): boolean {
    return this.getArea() > 0;
  }

  isRight(): boolean {
    const sides = [
      distance(this._p1, this._p2),
      distance(this._p2, this._p3),
      distance(this._p3, this._p1),
    ].sort((a, b) => a - b);
    return sides[0] ** 2 + sides[1] ** 2 === sides[2] ** 2;
  }

  isEquilateral(): boolean {
    const [a, b, c] = [
      distance(this._p1, this._p2),
      distance(this._p2, this._p3),
      distance(this._p3, this._p1),
    ];
    return a === b && b === c;
  }

  isIsosceles(): boolean {
    const [a, b, c] = [
      distance(this._p1, this._p2),
      distance(this._p2, this._p3),
      distance(this._p3, this._p1),
    ];
    return a === b || b === c || c === a;
  }
}
