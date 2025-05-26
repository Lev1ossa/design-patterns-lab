import { ExecutionStrategy } from './ExecutionStrategy';

export class AgileStrategy extends ExecutionStrategy {
  protected runSteps(taskName: string): void {
    console.log(`[Agile] Executing "${taskName}" in sprints with daily standups.`);
  }
}
