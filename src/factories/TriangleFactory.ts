import { AbstractShapeFactory } from './AbstractShapeFactory';
import { Triangle } from '../entities/Triangle';
import { Point2D } from '../entities/Point2D';
import { Shape } from '../entities/Shape';

export class TriangleFactory extends AbstractShapeFactory {
  factoryMethod(data: number[], name: string): Shape | null {
    if (data.length < 6) {
      return null;
    }

    const [x1, y1, x2, y2, x3, y3] = data.map(Number);
    if (data.some((v) => Number.isNaN(v))) {
      return null;
    }

    return Triangle.create(name, new Point2D(x1, y1), new Point2D(x2, y2), new Point2D(x3, y3));
  }
}
