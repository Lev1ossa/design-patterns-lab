import { readShapeData } from './utils/fileReader';
import { ShapeFactory } from './factories/ShapeFactory';
import { GeometryService } from './services/GeometryService';
import { logger } from './logger/logger';
import { InvalidShapeDataError } from './exceptions/InvalidShapeDataError';
import { ShapeValidator } from './validators/ShapeValidator';

async function main() {
  const filePath = './data/figures.txt';
  const shapeFactory = new ShapeFactory();

  const lines = await readShapeData(filePath);

  lines.forEach((data, index) => {
    try {
      const values = data.map(Number);

      if (values.some(Number.isNaN)) {
        throw new InvalidShapeDataError(`Non-numeric values at line ${index + 1}`);
      }

      const type = ShapeValidator.detectShapeType(values);
      if (!type) {
        throw new InvalidShapeDataError(`Unknown shape type at line ${index + 1}`);
      }

      const isValid =
        (type === 'triangle' && ShapeValidator.validateTriangle(values)) ||
        (type === 'cone' && ShapeValidator.validateCone(values));

      if (!isValid) {
        throw new InvalidShapeDataError(`Invalid ${type} at line ${index + 1}`);
      }

      const name = `${type} №${index + 1}`;
      const shape = shapeFactory.createShape(values, name);
      if (!shape) {
        throw new InvalidShapeDataError(`Failed to create shape at line ${index + 1}`);
      }

      GeometryService.printShapeInfo(shape);
      logger.info(`Shape "${shape.name}" created and validated successfully.`);
    } catch (err) {
      const valuesStr = data.join(', ');
      const msg = `Unexpected error at line ${index + 1}`;
      if (err instanceof InvalidShapeDataError) {
        logger.warn({ values: valuesStr, line: index + 1 }, err.message);
      } else {
        logger.error({ values: valuesStr, line: index + 1, err }, msg);
      }
    }
  });
}

main();
