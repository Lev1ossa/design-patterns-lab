import { CourseBlockLeaf } from '../core/composite/CourseBlockLeaf';
import { CourseModule } from '../core/composite/CourseModule';
import { RequiredDecorator } from '../core/decorator/RequiredDecorator';
import { CourseComponent } from '../core/composite/CourseComponent';
import { CourseComponentDTO } from '../types/types';
import { Completed, InProgress, NotStarted } from '../core/state/BlockState';
import { StatefulComponent } from '../core/state/BlockState';


export function deserializeCourse(data: CourseComponentDTO[]): CourseModule[] {
  return data
    .map(deserializeComponent)
    .filter((c): c is CourseModule => c.getType() === 'module');
}


function deserializeComponent(dto: CourseComponentDTO): CourseComponent {
  let component: CourseComponent;

  if (dto.type === 'module') {
    const module = new CourseModule(dto.title);
    if (dto.children) {
      dto.children.map(deserializeComponent).forEach(child => module.add(child));
    }
    component = module;
  } else {
    const leaf = new CourseBlockLeaf(dto.type, dto.title);
    restoreState(leaf, dto.state);

    component = dto.required ? new RequiredDecorator(leaf) : leaf;
  }

  return component;
}

function isStatefulComponent(component: CourseComponent): component is CourseComponent & StatefulComponent {
  return 'setState' in component && typeof (component as StatefulComponent).setState === 'function';
}

export function restoreState(component: CourseComponent, state?: string): void {
  if (!state || !isStatefulComponent(component)) return;

  switch (state) {
    case 'не начат':
      component.setState(new NotStarted(component));
      break;
    case 'в процессе':
      component.setState(new InProgress(component));
      break;
    case 'завершён':
      component.setState(new Completed(component));
      break;
  }
}

