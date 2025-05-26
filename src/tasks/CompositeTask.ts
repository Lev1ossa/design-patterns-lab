import { AbstractTask } from './AbstractTask';
import { ExecutionStrategy } from '../strategies/ExecutionStrategy';

export class CompositeTask extends AbstractTask {
  private subtasks: AbstractTask[] = [];

  constructor(name: string, strategy: ExecutionStrategy) {
    super(name, 0, strategy);
  }

  add(task: AbstractTask): void {
    this.subtasks.push(task);
  }

  getTimeEstimate(): number {
    return this.subtasks.reduce((sum, task) => sum + task.getTimeEstimate(), 0);
  }

  list(indent: string = ''): void {
    console.log(`${indent}+ ${this.name} (${this.getTimeEstimate()}h total)`);
    this.subtasks.forEach((task) => task.list(`${indent}  `));
  }

  execute(): void {
    console.log(`\n[Composite Task] Executing project "${this.name}" with its strategy:`);
    this.strategy.execute(this.name);
    this.subtasks.forEach((task) => task.execute());
  }
}
