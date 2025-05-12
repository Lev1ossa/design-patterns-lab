import { Shape } from '../entities/Shape';
import { ShapeComparator } from '../comparators/ShapeComparator';
import { Warehouse } from '../warehouse/Warehouse';

export class ShapeRepository {
  private shapes: Shape[] = [];

  add(shape: Shape): void {
    this.shapes.push(shape);
    Warehouse.getInstance().update(shape.name, shape);
  }

  removeByName(name: string): void {
    this.shapes = this.shapes.filter((shape) => shape.name !== name);
    Warehouse.getInstance().remove(name);
  }

  getAll(): Shape[] {
    return [...this.shapes];
  }

  findByName(name: string): Shape | undefined {
    return this.shapes.find((shape) => shape.name === name);
  }

  findById(id: string): Shape | undefined {
    return this.shapes.find((shape) => shape.name === id);
  }

  findByArea(area: number): Shape[] {
    return this.shapes.filter((shape) => Math.abs(shape.getArea() - area) <= 0.01);
  }

  findByVolume(volume: number): Shape[] {
    return this.shapes.filter(
      (shape) =>
        'getVolume' in shape &&
        typeof shape.getVolume === 'function' &&
        Math.abs(shape.getVolume() - volume) <= 0.01,
    );
  }

  findByDistanceFromOrigin(distance: number): Shape[] {
    return this.shapes.filter((shape) => {
      let point: { x: number; y: number; z?: number };

      if ('apex' in shape && shape.apex) {
        point = shape.apex as { x: number; y: number; z?: number };
      } else if ('p1' in shape && shape.p1) {
        point = shape.p1 as { x: number; y: number; z?: number };
      } else {
        return false;
      }

      const coords = [point.x, point.y, point.z ?? 0];
      const d = Math.hypot(...coords);
      return Math.abs(d - distance) <= 0.01;
    });
  }

  sortByName(): Shape[] {
    return [...this.shapes].sort(ShapeComparator.byName);
  }

  sortByX(): Shape[] {
    return [...this.shapes].sort(ShapeComparator.byX);
  }

  sortByY(): Shape[] {
    return [...this.shapes].sort(ShapeComparator.byY);
  }
}
