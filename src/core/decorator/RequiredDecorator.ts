import { CourseComponent } from '../composite/CourseComponent';
import { CourseComponentDTO } from '../../types/types';
import { Visitor } from '../visitor/CourseVisitor';

export class RequiredDecorator implements CourseComponent {
  constructor(private wrapped: CourseComponent) {}

  getTitle(): string {
    return this.wrapped.getTitle();
  }

  getType(): string {
    return this.wrapped.getType();
  }

  getChildren(): CourseComponent[] {
    return this.wrapped.getChildren();
  }

  getState?(): string {
    return this.wrapped.getState?.() ?? 'не начат';
  }

  toggleState?(): void {
    this.wrapped.toggleState?.();
  }

  isRequired(): boolean {
    return true;
  }

  getWrapped(): CourseComponent {
    return this.wrapped;
  }

  toJSON(): CourseComponentDTO {
    const base = this.wrapped.toJSON();
    return {
      ...base,
      required: true,
    };
  }

  accept(visitor: Visitor): void {
  visitor.visitLeaf(this);
}
}
