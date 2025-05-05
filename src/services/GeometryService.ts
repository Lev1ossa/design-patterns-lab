import { Shape } from '../entities/Shape';

export class GeometryService {
  static printShapeInfo(shape: Shape): void {
    console.log(`Name: ${shape.name}`);
    console.log(`Area: ${shape.getArea().toFixed(2)}`);
    console.log(`Perimeter: ${shape.getPerimeter().toFixed(2)}`);

    if ('getVolume' in shape && typeof shape.getVolume === 'function') {
      console.log(`Volume: ${shape.getVolume().toFixed(2)}`);
    }

    if ('isValid' in shape && typeof shape.isValid === 'function') {
      console.log(`Valid: ${shape.isValid()}`);
    }

    if ('isRight' in shape && typeof shape.isRight === 'function') {
      console.log(`Right: ${shape.isRight()}`);
    }

    if ('isEquilateral' in shape && typeof shape.isEquilateral === 'function') {
      console.log(`Equilateral: ${shape.isEquilateral()}`);
    }

    if ('isIsosceles' in shape && typeof shape.isIsosceles === 'function') {
      console.log(`Isosceles: ${shape.isIsosceles()}`);
    }

    if ('isOnCoordinatePlane' in shape && typeof shape.isOnCoordinatePlane === 'function') {
      console.log(`On Coordinate Plane: ${shape.isOnCoordinatePlane()}`);
    }

    console.log(' ');
  }
}
