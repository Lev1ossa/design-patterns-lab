export class ShapeValidator {
  static isTriangle(values: number[]): boolean {
    if (values.length !== 6 || values.some(Number.isNaN)) {
      return false;
    }
    const [x1, y1, x2, y2, x3, y3] = values;
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    return area > 0;
  }

  static isCone(values: number[]): boolean {
    if (values.length !== 8 || values.some(Number.isNaN)) {
      return false;
    }
    const [x1, y1, z1, x2, y2, z2, radius, height] = values;
    const apexEqualsBase = x1 === x2 && y1 === y2 && z1 === z2;
    return !apexEqualsBase && radius > 0 && height > 0;
  }

  static detectShapeType(values: number[]): 'triangle' | 'cone' | null {
    if (ShapeValidator.isTriangle(values)) {
      return 'triangle';
    }
    if (ShapeValidator.isCone(values)) {
      return 'cone';
    }
    return null;
  }

  static validateTriangle(values: number[]): boolean {
    return ShapeValidator.isTriangle(values);
  }

  static validateCone(values: number[]): boolean {
    return ShapeValidator.isCone(values);
  }
}
