import { CourseComponentDTO } from '../../types/types';

export interface CourseObserver {
  update(data: CourseComponentDTO[]): void;
}

export class CourseSubject {
  private observers: CourseObserver[] = [];

  subscribe(observer: CourseObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: CourseObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data: CourseComponentDTO[]): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
