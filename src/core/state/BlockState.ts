export interface BlockState {
  toggle(): void;
  getName(): string;
}

export interface StatefulComponent {
  setState(state: BlockState): void;
}

export class NotStarted implements BlockState {
  constructor(private context: StatefulComponent) {}

  toggle(): void {
    this.context.setState(new InProgress(this.context));
  }

  getName(): string {
    return 'не начат';
  }
}

export class InProgress implements BlockState {
  constructor(private context: StatefulComponent) {}

  toggle(): void {
    this.context.setState(new Completed(this.context));
  }

  getName(): string {
    return 'в процессе';
  }
}

export class Completed implements BlockState {
  constructor(private context: StatefulComponent) {}

  toggle(): void {
    this.context.setState(new NotStarted(this.context));
  }

  getName(): string {
    return 'завершён';
  }
}
