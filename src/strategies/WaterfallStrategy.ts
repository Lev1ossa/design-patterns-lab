import { ExecutionStrategy } from './ExecutionStrategy';

export class WaterfallStrategy extends ExecutionStrategy {
  protected runSteps(taskName: string): void {
    console.log(`[Waterfall] Executing "${taskName}" step-by-step in strict phases.`);
  }
}
