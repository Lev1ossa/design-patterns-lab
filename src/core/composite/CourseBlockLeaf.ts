import { CourseComponent } from './CourseComponent';
import { BlockState, StatefulComponent } from '../state/BlockState';
import { NotStarted } from '../state/BlockState';
import { Visitor } from '../visitor/CourseVisitor';

export class CourseBlockLeaf implements CourseComponent, StatefulComponent {
  private state: BlockState;

  constructor(private type: string, private title: string) {
    this.state = new NotStarted(this);
  }

  getTitle(): string {
    return this.title;
  }

  getType(): string {
    return this.type;
  }

  getChildren(): CourseComponent[] {
    return [];
  }

  getState(): string {
    return this.state.getName();
  }

  toggleState(): void {
    this.state.toggle();
  }

  setState(state: BlockState): void {
    this.state = state;
  }

  isRequired?(): boolean {
    return false;
  }

  accept(visitor: Visitor): void {
    visitor.visitLeaf(this);
  }

  toJSON() {
    return {
      type: this.type,
      title: this.title,
      state: this.getState(),
      required: this.isRequired?.() ?? false,
    };
  }
}
