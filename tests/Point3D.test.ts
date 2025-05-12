import { Point3D } from '../src/entities/Point3D';

describe('Point3D', () => {
  it('should store x, y, and z correctly', () => {
    const point = new Point3D(1, 2, 3);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(3);
  });
});
