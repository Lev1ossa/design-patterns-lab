import { readShapeData } from './utils/fileReader';
import { ShapeFactory } from './factories/ShapeFactory';
import { GeometryService } from './services/GeometryService';
import { logger } from './logger/logger';
import { InvalidShapeDataError } from './exceptions/InvalidShapeDataError';
import { ShapeValidator } from './validators/ShapeValidator';
import { ShapeRepository } from './repository/ShapeRepository';

async function main() {
  const filePath = './data/figures.txt';
  const shapeFactory = new ShapeFactory();
  const repository = new ShapeRepository();

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

      const shape = shapeFactory.createShape(values, `${type}_${index + 1}`);
      if (!shape) {
        throw new InvalidShapeDataError(`Failed to create shape at line ${index + 1}`);
      }

      repository.add(shape);
      logger.info(`Shape "${shape.name}" created and validated successfully.`);
    } catch (err) {
      if (err instanceof InvalidShapeDataError) {
        logger.warn(err.message, { values: lines[index], line: index + 1 });
      } else {
        logger.error(`Unexpected error at line ${index + 1}:`, err);
      }
    }
  });

  console.log('\nAll Shapes:');
  repository.getAll().forEach(GeometryService.printShapeInfo);

  console.log('\nSorted by Name:');
  repository.sortByName().forEach(GeometryService.printShapeInfo);

  console.log('\nShapes with area ≈ 6:');
  repository.findByArea(6).forEach(GeometryService.printShapeInfo);

  console.log('\nShapes near origin (distance ≈ 5):');
  repository.findByDistanceFromOrigin(5).forEach(GeometryService.printShapeInfo);
}

main();
