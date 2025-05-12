import { Shape } from '../entities/Shape';
import { Observer } from './Observer';

export abstract class Observable {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers(shapeId: string, shape: Shape): void {
    this.observers.forEach((observer) => observer.update(shapeId, shape));
  }
}
