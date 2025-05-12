import { GeometryService } from '../src/services/GeometryService';
import { Triangle } from '../src/entities/Triangle';
import { Point2D } from '../src/entities/Point2D';

describe('GeometryService', () => {
  it('should print triangle info without throwing', () => {
    const triangle = Triangle.create('T', new Point2D(0, 0), new Point2D(3, 0), new Point2D(0, 4));
    expect(() => GeometryService.printShapeInfo(triangle)).not.toThrow();
  });
});
