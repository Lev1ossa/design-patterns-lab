import { Triangle } from '../src/entities/Triangle';
import { Point2D } from '../src/entities/Point2D';

describe('Triangle', () => {
  it('should detect equilateral triangle', () => {
    const t = Triangle.create(
      'triangle',
      new Point2D(0, 0),
      new Point2D(1, Math.sqrt(3)),
      new Point2D(2, 0),
    );
    expect(t.isEquilateral()).toBe(true);
    expect(t.isIsosceles()).toBe(true);
    expect(t.isRight()).toBe(false);
  });

  it('should detect isosceles triangle', () => {
    const t = Triangle.create('triangle', new Point2D(0, 0), new Point2D(2, 0), new Point2D(1, 2));
    expect(t.isIsosceles()).toBe(true);
    expect(t.isEquilateral()).toBe(false);
    expect(t.isRight()).toBe(false);
  });

  it('should detect right isosceles triangle', () => {
    const t = Triangle.create('triangle', new Point2D(0, 0), new Point2D(2, 1), new Point2D(1, 3));
    expect(t.isEquilateral()).toBe(false);
    expect(t.isIsosceles()).toBe(true);
    expect(t.isRight()).toBe(true);
  });

  it('should compute perimeter correctly', () => {
    const t = Triangle.create('triangle', new Point2D(0, 0), new Point2D(3, 0), new Point2D(0, 4));
    expect(t.getPerimeter()).toBeCloseTo(12, 2);
  });

  it('should return name field from base class', () => {
    const t = Triangle.create(
      'MyTriangle',
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(0, 1),
    );
    expect(t.name).toBe('MyTriangle');
  });
});
