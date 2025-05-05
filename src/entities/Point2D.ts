import { Point } from './Point';

export class Point2D extends Point {
  constructor(
    public x: number,
    public y: number,
  ) {
    super();
  }

  getCoordinates(): number[] {
    return [this.x, this.y];
  }
}
