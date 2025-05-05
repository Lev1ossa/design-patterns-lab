import { AbstractShapeFactory } from './AbstractShapeFactory';
import { Cone } from '../entities/Cone';
import { Point3D } from '../entities/Point3D';
import { Shape } from '../entities/Shape';

export class ConeFactory extends AbstractShapeFactory {
  factoryMethod(data: number[], name: string): Shape | null {
    if (data.length < 8) {
      return null;
    }

    const [x1, y1, z1, x2, y2, z2, r, h] = data.map(Number);
    if (data.some((v) => Number.isNaN(v))) {
      return null;
    }

    return Cone.create(name, new Point3D(x1, y1, z1), new Point3D(x2, y2, z2), r, h);
  }
}
