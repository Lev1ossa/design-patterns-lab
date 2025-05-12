import { Shape } from '../entities/Shape';

export interface Observer {
  update(shapeId: string, shape: Shape): void;
}
