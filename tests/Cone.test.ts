import { Cone } from '../src/entities/Cone';
import { Point3D } from '../src/entities/Point3D';

describe('Cone', () => {
  it('should detect cone not on any coordinate plane', () => {
    const cone = Cone.create('cone', new Point3D(1, 1, 1), new Point3D(2, 2, 2), 3, 1);
    expect(cone.isOnCoordinatePlane()).toBe(false);
  });

  it('should compute volume and surface area', () => {
    const cone = Cone.create('cone', new Point3D(0, 0, 0), new Point3D(0, 0, 3), 3, 3);
    expect(cone.getVolume()).toBeCloseTo((1 / 3) * Math.PI * 9 * 3, 2);
    expect(cone.getArea()).toBeCloseTo(Math.PI * 3 * (3 + Math.sqrt(9 + 9)), 2);
  });

  it('should return name field from base class', () => {
    const c = Cone.create('MyCone', new Point3D(0, 0, 1), new Point3D(0, 0, 0), 2, 3);
    expect(c.name).toBe('MyCone');
  });

  it('should return correct section volume ratios', () => {
    const c = Cone.create('Cone', new Point3D(0, 0, 2), new Point3D(0, 0, -2), 2, 4);
    const ratios = c.getSectionVolumeRatios();
    expect(ratios.XY).toBeCloseTo(1);
    expect(ratios.XZ).toBeNull();
    expect(ratios.YZ).toBeNull();
  });
});
