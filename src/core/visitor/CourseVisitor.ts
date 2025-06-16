import { CourseModule } from '../composite/CourseModule';
import { CourseComponent } from '../composite/CourseComponent';

export interface Visitor {
  visitModule(module: CourseModule): void;
  visitLeaf(component: CourseComponent): void;
}

type CourseType = 'lesson' | 'test' | 'assignment';

export class CourseVisitor implements Visitor {
  private stats: Record<
    CourseType | 'completed' | `required${Capitalize<CourseType>}` | 'requiredCompleted',
    number
  > = {
    lesson: 0,
    test: 0,
    assignment: 0,
    completed: 0,
    requiredLesson: 0,
    requiredTest: 0,
    requiredAssignment: 0,
    requiredCompleted: 0,
  };

  visitModule(module: CourseModule): void {
    module.getChildren().forEach((child) => child.accept(this));
  }

  visitLeaf(component: CourseComponent): void {
  const type = component.getType() as CourseType;
  const isRequired = component.isRequired?.() || false;
  const state = component.getState?.();

  this.stats[type]++;
  if (isRequired) {
    const key = `required${capitalize(type)}` as `required${Capitalize<CourseType>}`;
    this.stats[key]++;
  }

  if (state === 'завершён') {
    this.stats.completed++;
    if (isRequired) {
      this.stats.requiredCompleted++;
    }
  }
}

  getResult(): string {
    return (
      `Всего:\n` +
      `- Уроков: ${this.stats.lesson}\n` +
      `- Тестов: ${this.stats.test}\n` +
      `- Заданий: ${this.stats.assignment}\n` +
      `- Завершено всего: ${this.stats.completed}\n\n` +
      `Обязательные:\n` +
      `- Уроков: ${this.stats.requiredLesson}\n` +
      `- Тестов: ${this.stats.requiredTest}\n` +
      `- Заданий: ${this.stats.requiredAssignment}\n` +
      `- Завершено обязательных: ${this.stats.requiredCompleted}`
    );
  }
}

function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
