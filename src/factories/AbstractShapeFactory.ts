import { Shape } from '../entities/Shape';

export abstract class AbstractShapeFactory {
  abstract factoryMethod(data: number[], name: string): Shape | null;

  create(data: number[], name: string): Shape | null {
    return this.factoryMethod(data, name);
  }
}
