import { AbstractTask } from './AbstractTask';

export class SimpleTask extends AbstractTask {
  getTimeEstimate(): number {
    return this.time;
  }

  list(indent: string = ''): void {
    console.log(`${indent}- ${this.name} (${this.time}h)`);
  }

  execute(): void {
    this.strategy.execute(this.name);
  }
}
