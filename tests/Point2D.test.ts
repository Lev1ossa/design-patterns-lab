import { Point2D } from '../src/entities/Point2D';

describe('Point2D', () => {
  it('should store x and y correctly', () => {
    const point = new Point2D(3, 4);
    expect(point.x).toBe(3);
    expect(point.y).toBe(4);
  });
});
