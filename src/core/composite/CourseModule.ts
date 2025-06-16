import { CourseComponentDTO } from '../../types/types';
import { Visitor } from '../visitor/CourseVisitor';
import { CourseComponent } from './CourseComponent';

export class CourseModule implements CourseComponent {
  private children: CourseComponent[] = [];

  constructor(private title: string) {}

  add(component: CourseComponent): void {
    this.children.push(component);
  }

  getTitle(): string {
    return this.title;
  }

  getType(): string {
    return 'module';
  }

  getChildren(): CourseComponent[] {
    return this.children;
  }

  getState(): string {
    const children = this.getChildren();
    if (children.every((child) => child.getState?.() === 'завершён')) {
      return 'завершён';
    }
    if (children.some((child) => child.getState?.() === 'в процессе' || child.getState?.() === 'завершён')) {
      return 'в процессе';
    }
    return 'не начат';
  }

  accept(visitor: Visitor): void {
    visitor.visitModule(this);
  }

  toJSON(): CourseComponentDTO {
  return {
    type: this.getType(),
    title: this.getTitle(),
    children: this.children.map((child) => child.toJSON()),
    required: false,
    state: this.getState?.() ?? 'не начат'
  };
}
}