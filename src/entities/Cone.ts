import { Shape } from './Shape';
import { Point3D } from './Point3D';
import { Warehouse } from '../warehouse/Warehouse';

export class Cone extends Shape {
  private _apex: Point3D;

  private _baseCenter: Point3D;

  private _radius: number;

  private _height: number;

  get apex() {
    return this._apex;
  }

  set apex(val: Point3D) {
    this._apex = val;
    this.notifyObservers(this.name, this);
  }

  get baseCenter() {
    return this._baseCenter;
  }

  set baseCenter(val: Point3D) {
    this._baseCenter = val;
    this.notifyObservers(this.name, this);
  }

  get radius() {
    return this._radius;
  }

  set radius(val: number) {
    this._radius = val;
    this.notifyObservers(this.name, this);
  }

  get height() {
    return this._height;
  }

  set height(val: number) {
    this._height = val;
    this.notifyObservers(this.name, this);
  }

  private constructor(
    name: string,
    apex: Point3D,
    baseCenter: Point3D,
    radius: number,
    height: number,
  ) {
    super(name);
    this._apex = apex;
    this._baseCenter = baseCenter;
    this._radius = radius;
    this._height = height;
    this.addObserver(Warehouse.getInstance());
    this.notifyObservers(this.name, this);
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
    const slantHeight = Math.sqrt(this._radius ** 2 + this._height ** 2);
    return Math.PI * this._radius * (this._radius + slantHeight);
  }

  getPerimeter(): number {
    return 2 * Math.PI * this._radius;
  }

  getVolume(): number {
    return (1 / 3) * Math.PI * this._radius ** 2 * this._height;
  }

  isValid(): boolean {
    return (
      this._radius > 0 &&
      this._height > 0 &&
      !(
        this._apex.x === this._baseCenter.x &&
        this._apex.y === this._baseCenter.y &&
        this._apex.z === this._baseCenter.z
      )
    );
  }

  isOnCoordinatePlane(): boolean {
    const sameX = this._apex.x === 0 && this._baseCenter.x === 0;
    const sameY = this._apex.y === 0 && this._baseCenter.y === 0;
    const sameZ = this._apex.z === 0 && this._baseCenter.z === 0;
    return sameX || sameY || sameZ;
  }

  getSectionVolumeRatios(): { [plane: string]: number | null } {
    const result: { [plane: string]: number | null } = {};

    const checkPlane = (coord1: number, coord2: number): number | null => {
      if ((coord1 > 0 && coord2 > 0) || (coord1 < 0 && coord2 < 0)) {
        return null;
      }
      const total = Math.abs(coord2 - coord1);
      const h1 = Math.abs(coord1);
      const h2 = total - h1;
      if (h1 === 0 || h2 === 0) {
        return null;
      }
      return h1 ** 3 / h2 ** 3;
    };

    result.XY = checkPlane(this._apex.z, this._baseCenter.z);
    result.XZ = checkPlane(this._apex.y, this._baseCenter.y);
    result.YZ = checkPlane(this._apex.x, this._baseCenter.x);

    return result;
  }
}
