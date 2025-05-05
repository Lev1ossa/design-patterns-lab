import { Shape } from '../entities/Shape';
import { TriangleFactory } from './TriangleFactory';
import { ConeFactory } from './ConeFactory';

export class ShapeFactory {
  private triangleFactory = new TriangleFactory();

  private coneFactory = new ConeFactory();

  createShape(data: number[], name: string): Shape | null {
    switch (data.length) {
      case 6:
        return this.triangleFactory.create(data, name);
      case 8:
        return this.coneFactory.create(data, name);
      default:
        return null;
    }
  }
}
