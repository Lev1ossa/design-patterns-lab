import { ExecutionStrategy } from './ExecutionStrategy';

export class RUPStrategy extends ExecutionStrategy {
  protected runSteps(taskName: string): void {
    console.log(`[RUP] Executing "${taskName}" using iterative and incremental phases.`);
  }
}
