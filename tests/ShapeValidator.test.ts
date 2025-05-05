import { ShapeValidator } from '../src/validators/ShapeValidator';

describe('ShapeValidator', () => {
  it('should detect triangle by 6 values', () => {
    expect(ShapeValidator.detectShapeType([0, 0, 1, 0, 0, 1])).toBe('triangle');
  });

  it('should detect cone by 8 values', () => {
    expect(ShapeValidator.detectShapeType([0, 0, 1, 0, 0, 0, 1, 1])).toBe('cone');
  });

  it('should reject unknown shape type', () => {
    expect(ShapeValidator.detectShapeType([0, 0, 0])).toBe(null);
  });

  it('should validate valid triangle', () => {
    expect(ShapeValidator.validateTriangle([0, 0, 3, 0, 0, 4])).toBe(true);
  });

  it('should reject invalid triangle (collinear)', () => {
    expect(ShapeValidator.validateTriangle([0, 0, 1, 1, 2, 2])).toBe(false);
  });

  it('should validate valid cone', () => {
    expect(ShapeValidator.validateCone([0, 0, 1, 0, 0, 0, 1, 2])).toBe(true);
  });

  it('should reject invalid cone (zero height)', () => {
    expect(ShapeValidator.validateCone([0, 0, 0, 0, 0, 0, 0, 2])).toBe(false);
  });

  it('should reject invalid cone (zero radius)', () => {
    expect(ShapeValidator.validateCone([0, 0, 1, 0, 0, 0, 1, 0])).toBe(false);
  });
});
