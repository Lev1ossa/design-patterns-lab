import { Observer } from '../observer/Observer';
import { Shape } from '../entities/Shape';

type ShapeMeta = {
  area: number;
  perimeter: number;
  volume?: number;
};

export class Warehouse implements Observer {
  private static instance: Warehouse;

  private data: Map<string, ShapeMeta> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  update(id: string, shape: Shape): void {
    const area = shape.getArea();
    const perimeter = shape.getPerimeter();
    const volume =
      'getVolume' in shape && typeof shape.getVolume === 'function' ? shape.getVolume() : undefined;

    this.data.set(id, { area, perimeter, volume });
  }

  remove(id: string): void {
    this.data.delete(id);
  }

  get(id: string): ShapeMeta | undefined {
    return this.data.get(id);
  }

  getAll(): Map<string, ShapeMeta> {
    return this.data;
  }
}
