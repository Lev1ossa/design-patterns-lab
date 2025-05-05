import { Point2D } from '../src/entities/Point2D';
import { Point3D } from '../src/entities/Point3D';

describe('Point2D', () => {
  it('should store x and y correctly', () => {
    const p = new Point2D(5, 10);
    expect(p.x).toBe(5);
    expect(p.y).toBe(10);
  });
});

describe('Point3D', () => {
  it('should store x, y and z correctly', () => {
    const p = new Point3D(1, 2, 3);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.z).toBe(3);
  });
});
