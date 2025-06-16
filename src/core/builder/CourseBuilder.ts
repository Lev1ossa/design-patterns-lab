import { CourseModule } from '../composite/CourseModule';
import { CourseBlockLeaf } from '../composite/CourseBlockLeaf';

export class CourseBuilder {
  private module: CourseModule;

  constructor(title: string) {
    this.module = new CourseModule(title);
  }

  static fromExisting(existing: CourseModule): CourseBuilder {
    const builder = new CourseBuilder(existing.getTitle());
    existing.getChildren().forEach(child => builder.module.add(child));
    return builder;
  }

  addLesson(title: string): CourseBuilder {
    this.module.add(new CourseBlockLeaf('lesson', title));
    return this;
  }

  addTest(title: string): CourseBuilder {
    this.module.add(new CourseBlockLeaf('test', title));
    return this;
  }

  addAssignment(title: string): CourseBuilder {
    this.module.add(new CourseBlockLeaf('assignment', title));
    return this;
  }

  build(): CourseModule {
    return this.module;
  }
}
