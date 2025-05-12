import { Warehouse } from '../src/warehouse/Warehouse';
import { Triangle } from '../src/entities/Triangle';
import { Point2D } from '../src/entities/Point2D';
import { Cone } from '../src/entities/Cone';
import { Point3D } from '../src/entities/Point3D';

describe('Warehouse', () => {
  it('should store and retrieve triangle data', () => {
    Triangle.create('T1', new Point2D(0, 0), new Point2D(3, 0), new Point2D(0, 4));
    const warehouse = Warehouse.getInstance();
    const meta = warehouse.get('T1');

    expect(meta).toBeDefined();
    expect(meta!.area).toBeCloseTo(6);
    expect(meta!.perimeter).toBeCloseTo(12);
    expect(meta!.volume).toBeUndefined();
  });

  it('should store and retrieve cone data', () => {
    Cone.create('C1', new Point3D(0, 0, 2), new Point3D(0, 0, 0), 2, 2);
    const warehouse = Warehouse.getInstance();
    const meta = warehouse.get('C1');

    expect(meta).toBeDefined();
    expect(meta!.area).toBeCloseTo(Math.PI * 2 * (2 + Math.sqrt(8)));
    expect(meta!.volume).toBeCloseTo((1 / 3) * Math.PI * 4 * 2);
    expect(meta!.perimeter).toBeCloseTo(2 * Math.PI * 2);
  });
});

it('should update metadata when figure is recreated with same id', () => {
  Triangle.create('T2', new Point2D(0, 0), new Point2D(4, 0), new Point2D(0, 3));
  const warehouse = Warehouse.getInstance();
  let meta = warehouse.get('T2');
  expect(meta!.area).toBeCloseTo(6);

  // recreate with same id but different geometry
  Triangle.create('T2', new Point2D(0, 0), new Point2D(5, 0), new Point2D(0, 4));
  meta = warehouse.get('T2');
  expect(meta!.area).toBeCloseTo(10);
});
