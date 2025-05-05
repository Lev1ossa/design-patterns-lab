export abstract class Shape {
  constructor(public name: string) {}

  abstract getArea(): number;

  abstract getPerimeter(): number;
}
