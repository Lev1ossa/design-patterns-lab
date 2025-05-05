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
      const valuesStr = data.join(', ');

      if (values.some(Number.isNaN)) {
        logger.warn({ values: valuesStr, line: index + 1 }, 'Non-numeric values');
        return;
      }

      const type = ShapeValidator.detectShapeType(values);
      if (!type) {
        logger.warn({ values: valuesStr, line: index + 1 }, 'Unknown shape type');
        return;
      }

      const isValid =
        (type === 'triangle' && ShapeValidator.validateTriangle(values)) ||
        (type === 'cone' && ShapeValidator.validateCone(values));

      if (!isValid) {
        logger.warn({ values: valuesStr, line: index + 1 }, `Invalid ${type}`);
        return;
      }

      const name = `${type} №${index + 1}`;
      const shape = shapeFactory.createShape(values, name);
      if (!shape) {
        logger.warn({ values: valuesStr, line: index + 1 }, 'Failed to create shape');
        return;
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
