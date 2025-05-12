import { Observable } from '../observer/Observable';

export abstract class Shape extends Observable {
  constructor(public name: string) {
    super();
  }

  abstract getArea(): number;

  abstract getPerimeter(): number;
}
