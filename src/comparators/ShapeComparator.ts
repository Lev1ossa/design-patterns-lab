import { Shape } from '../entities/Shape';
import { Triangle } from '../entities/Triangle';
import { Cone } from '../entities/Cone';

function isTriangle(shape: Shape): shape is Triangle {
  return 'p1' in shape;
}

function isCone(shape: Shape): shape is Cone {
  return 'apex' in shape;
}

export class ShapeComparator {
  static byName(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }

  static byId(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }

  static byX(a: Shape, b: Shape): number {
    let ax = 0;
    let bx = 0;

    if (isTriangle(a)) {
      ax = a.p1.x;
    } else if (isCone(a)) {
      ax = a.apex.x;
    }

    if (isTriangle(b)) {
      bx = b.p1.x;
    } else if (isCone(b)) {
      bx = b.apex.x;
    }

    return ax - bx;
  }

  static byY(a: Shape, b: Shape): number {
    let ay = 0;
    let by = 0;

    if (isTriangle(a)) {
      ay = a.p1.y;
    } else if (isCone(a)) {
      ay = a.apex.y;
    }

    if (isTriangle(b)) {
      by = b.p1.y;
    } else if (isCone(b)) {
      by = b.apex.y;
    }

    return ay - by;
  }
}
