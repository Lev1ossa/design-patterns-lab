import { ExecutionStrategy } from './ExecutionStrategy';

export class SpiralStrategy extends ExecutionStrategy {
  protected runSteps(taskName: string): void {
    console.log(`[Spiral] Executing "${taskName}" through risk-driven iterations.`);
  }
}
