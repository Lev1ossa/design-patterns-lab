import { AgileStrategy } from './strategies/AgileStrategy';
import { RUPStrategy } from './strategies/RUPStrategy';
import { SpiralStrategy } from './strategies/SpiralStrategy';
import { WaterfallStrategy } from './strategies/WaterfallStrategy';
import { CompositeTask } from './tasks/CompositeTask';
import { DesignTask } from './tasks/DesignTask';
import { DevelopmentTask } from './tasks/DevelopmentTask';
import { TestingTask } from './tasks/TestingTask';

function main() {
  const agile = new AgileStrategy();
  const waterfall = new WaterfallStrategy();
  const spiral = new SpiralStrategy();
  const rup = new RUPStrategy();

  const task1 = new DevelopmentTask('Implement Login', 8, agile);
  const task2 = new TestingTask('Test Login', 4, waterfall);
  const task3 = new DesignTask('Design Landing Page', 6, spiral);

  const frontendModule = new CompositeTask('Frontend Module', rup);
  frontendModule.add(task1);
  frontendModule.add(task2);
  frontendModule.add(task3);

  const task4 = new TestingTask('Integration Tests', 5, agile);

  const fullProject = new CompositeTask('Website Project', waterfall);
  fullProject.add(frontendModule);
  fullProject.add(task4);

  console.log('\nProject structure:');
  fullProject.list();

  console.log('\nExecuting project:');
  fullProject.execute();
}

main();
