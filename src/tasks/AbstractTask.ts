import { ExecutionStrategy } from '../strategies/ExecutionStrategy';

export abstract class AbstractTask {
  constructor(
    protected name: string,
    protected time: number,
    protected strategy: ExecutionStrategy,
  ) {}

  abstract getTimeEstimate(): number;

  abstract list(indent?: string): void;

  abstract execute(): void;
}
