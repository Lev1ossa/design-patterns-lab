export abstract class ExecutionStrategy {
  execute(taskName: string): void {
    this.logStart(taskName);
    this.runSteps(taskName);
    this.logEnd(taskName);
  }

  protected logStart(taskName: string): void {
    console.log(`\n[START] ${taskName}`);
  }

  protected logEnd(taskName: string): void {
    console.log(`[END] ${taskName}`);
  }

  protected abstract runSteps(taskName: string): void;
}
