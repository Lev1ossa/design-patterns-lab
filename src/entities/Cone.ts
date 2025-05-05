import { Shape } from './Shape';
import { Point3D } from './Point3D';

export class Cone extends Shape {
  private constructor(
    name: string,
    public apex: Point3D,
    public baseCenter: Point3D,
    public radius: number,
    public height: number,
  ) {
    super(name);
  }

  static create(
    name: string,
    apex: Point3D,
    baseCenter: Point3D,
    radius: number,
    height: number,
  ): Cone {
    return new Cone(name, apex, baseCenter, radius, height);
  }

  getArea(): number {
    const slantHeight = Math.sqrt(this.radius ** 2 + this.height ** 2);
    const baseArea = Math.PI * this.radius ** 2;
    const lateralArea = Math.PI * this.radius * slantHeight;
    return baseArea + lateralArea;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  getVolume(): number {
    return (1 / 3) * Math.PI * this.radius ** 2 * this.height;
  }

  isValid(): boolean {
    return this.radius > 0 && this.height > 0;
  }

  isOnCoordinatePlane(): boolean {
    const sameX = this.apex.x === 0 && this.baseCenter.x === 0;
    const sameY = this.apex.y === 0 && this.baseCenter.y === 0;
    const sameZ = this.apex.z === 0 && this.baseCenter.z === 0;

    return sameX || sameY || sameZ;
  }

  getSectionVolumeRatios(): { [plane: string]: number | null } {
    const result: { [plane: string]: number | null } = {};

    const checkPlane = (coord1: number, coord2: number): number | null => {
      if ((coord1 > 0 && coord2 > 0) || (coord1 < 0 && coord2 < 0)) {
        return null;
      }
      const total = Math.abs(coord2 - coord1);
      const h1 = Math.abs(0 - coord1);
      const h2 = total - h1;
      if (h1 === 0 || h2 === 0) {
        return null;
      }
      return h1 ** 3 / h2 ** 3;
    };

    result.XY = checkPlane(this.apex.z, this.baseCenter.z);
    result.XZ = checkPlane(this.apex.y, this.baseCenter.y);
    result.YZ = checkPlane(this.apex.x, this.baseCenter.x);

    return result;
  }
}
