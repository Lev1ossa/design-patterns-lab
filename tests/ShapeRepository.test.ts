import { ShapeRepository } from '../src/repository/ShapeRepository';
import { Triangle } from '../src/entities/Triangle';
import { Point2D } from '../src/entities/Point2D';

describe('ShapeRepository', () => {
  it('should add and retrieve shapes by name', () => {
    const repo = new ShapeRepository();
    const triangle = Triangle.create('t1', new Point2D(0, 0), new Point2D(3, 0), new Point2D(0, 4));
    repo.add(triangle);
    expect(repo.findByName('t1')).toBe(triangle);
  });

  it('should remove shapes by name', () => {
    const repo = new ShapeRepository();
    const triangle = Triangle.create('t2', new Point2D(0, 0), new Point2D(2, 0), new Point2D(0, 2));
    repo.add(triangle);
    repo.removeByName('t2');
    expect(repo.findByName('t2')).toBeUndefined();
  });
});
