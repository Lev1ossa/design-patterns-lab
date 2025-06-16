import { CourseComponent } from '../core/composite/CourseComponent';
import { CourseModule } from '../core/composite/CourseModule';
import { RequiredDecorator } from '../core/decorator/RequiredDecorator';
import { Checkbox, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  component: CourseComponent;
  modules: CourseModule[];
  setModules: (m: CourseModule[]) => void;
  depth?: number;
  onUpdate?: () => void;
  onDeleteModule?: (title: string) => void;
}

export function Course({
  component,
  modules,
  setModules,
  depth = 0,
  onUpdate,
  onDeleteModule,
}: Props) {
  const paddingLeft = `${depth * 20}px`;

  const handleClick = () => {
    if (component.toggleState) {
      component.toggleState();
      onUpdate?.();
    }
  };

  const handleToggleRequired = () => {
    const updated = modules.map((mod) => {
      const replace = (node: CourseComponent): CourseComponent => {
        if (node === component) {
          if (component.isRequired?.()) {
            if ('getWrapped' in component && typeof component.getWrapped === 'function') {
              return component.getWrapped();
            }
          } else {
            return new RequiredDecorator(component);
          }
        }

        const children = node.getChildren();
        if (!children.length) return node;

        const newChildren = children.map(replace);
        const clone = new CourseModule(node.getTitle());
        newChildren.forEach((c) => clone.add(c));
        return clone;
      };

      return replace(mod) as CourseModule;
    });

    setModules(updated);
  };

  const handleDelete = () => {
    const updated = modules
      .map((mod) => {
        const remove = (node: CourseComponent): CourseComponent | null => {
          if (node === component) return null;

          const children = node.getChildren();
          if (!children.length) return node;

          const newChildren = children.map(remove).filter((c): c is CourseComponent => c !== null);
          const clone = new CourseModule(node.getTitle());
          newChildren.forEach((c) => clone.add(c));
          return clone;
        };

        return remove(mod);
      })
      .filter((m): m is CourseModule => m !== null);

    setModules(updated);
  };

  const handleDeleteModule = () => {
    if (component.getType() === 'module') {
      onDeleteModule?.(component.getTitle());
    }
  };

  return (
    <div style={{ paddingLeft, userSelect: 'none', marginBottom: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          p: 1,
          borderRadius: 1,
          backgroundColor: component.getType() === 'module' ? '#f0f0f0' : 'transparent',
          border: component.getType() === 'module' ? '1px solid #ccc' : 'none',
          fontWeight: component.getType() === 'module' ? 'bold' : 'normal',
          '&:hover': { backgroundColor: '#f9f9f9' },
        }}
      >
        <div
          onClick={handleClick}
          style={{
            cursor: component.toggleState ? 'pointer' : 'default',
            flexGrow: 1,
            color:
              component.getState?.() === 'завершён'
                ? 'green'
                : component.getState?.() === 'в процессе'
                ? 'orange'
                : 'inherit',
          }}
        >
          {component.getType() === 'module'
            ? `📦 ${component.getTitle()}`
            : `• [${component.getType()}] ${component.getTitle()} (${component.getState?.() || ''})`}
        </div>

        {component.getType() === 'module' ? (
          <IconButton onClick={handleDeleteModule} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        ) : (
          <>
            <Checkbox
              checked={component.isRequired?.() || false}
              onChange={handleToggleRequired}
              size="small"
            />
            <span style={{ fontSize: '0.8em' }}>Обязательный</span>
            <IconButton onClick={handleDelete} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Stack>

      {component.getChildren().map((child, index) => (
        <Course
          key={index}
          component={child}
          modules={modules}
          setModules={setModules}
          depth={depth + 1}
          onUpdate={onUpdate}
          onDeleteModule={onDeleteModule}
        />
      ))}
    </div>
  );
}
