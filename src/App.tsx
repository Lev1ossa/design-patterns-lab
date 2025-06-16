import { useEffect, useState } from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { CourseModule } from './core/composite/CourseModule';
import { Course } from './components/Course';
import { CourseVisitor } from './core/visitor/CourseVisitor';
import { CourseSubject } from './core/observer/CourseObserver';
import { LocalStorageObserver } from './core/observer/LocalStorageObserver';
import { deserializeCourse } from './utils/deserializer';
import { CourseComponentDTO } from './types/types';
import { CourseBuilder } from './core/builder/CourseBuilder';

export default function App() {
  const [customTitle, setCustomTitle] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);
  const [counter, setCounter] = useState(1);
  const [analysis, setAnalysis] = useState('');

  const subject = new CourseSubject();
  subject.subscribe(new LocalStorageObserver());

  useEffect(() => {
    const saved = localStorage.getItem('courseData');
    if (saved) {
      try {
        const parsed: CourseComponentDTO[] = JSON.parse(saved);
        const restored = deserializeCourse(parsed);
        setModules(restored);
      } catch (err) {
        console.error('Ошибка загрузки из localStorage:', err);
      }
    }
  }, []);

  const notifyAndUpdate = (updatedModules: CourseModule[]) => {
    setModules(updatedModules);
    subject.notify(updatedModules.map((m) => m.toJSON()));

    if (activeModule) {
      const refreshed = updatedModules.find(m => m.getTitle() === activeModule.getTitle());
      if (refreshed) setActiveModule(refreshed);
    }
  };

  const createModule = () => {
    const title = moduleTitle.trim() || `Модуль #${modules.length + 1}`;
    const newModule = new CourseModule(title);
    notifyAndUpdate([...modules, newModule]);
    setActiveModule(newModule);
    setModuleTitle('');
  };

  const addToActiveModule = (type: string) => {
    if (!activeModule) return;
    const title = customTitle.trim() || `${type} #${counter}`;

    const updatedModules = modules.map((mod) => {
      if (mod.getTitle() === activeModule.getTitle()) {
        const builder = CourseBuilder.fromExisting(mod);

        switch (type) {
          case 'lesson':
            builder.addLesson(title);
            break;
          case 'test':
            builder.addTest(title);
            break;
          case 'assignment':
            builder.addAssignment(title);
            break;
        }

        const newModule = builder.build();
        setActiveModule(newModule);
        return newModule;
      }

      return mod;
    });

    setCounter(counter + 1);
    setCustomTitle('');
    notifyAndUpdate(updatedModules);
  };

  const deleteModuleByTitle = (title: string) => {
    const filtered = modules.filter((mod) => mod.getTitle() !== title);
    notifyAndUpdate(filtered);
  };

  const analyzeCourse = () => {
  const visitor = new CourseVisitor();
  modules.forEach((mod) => mod.accept(visitor));
  setAnalysis(visitor.getResult());
};

  return (
    <Stack width='100%' alignItems='center'>
      <Stack spacing={3} p={4} maxWidth='1200px' width="100%" justifyContent='center'>
        <Typography variant="h4">Конструктор курса</Typography>

        {/* Создание модуля */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Название модуля"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <Button onClick={createModule} variant="contained">
            Создать модуль
          </Button>
        </Stack>

        {/* Список модулей */}
        {modules.length > 0 && (
          <Stack direction="row" flexWrap='wrap' gap='10px' justifyContent='flex-start'>
            {modules.map((mod, idx) => (
              <Button
                key={idx}
                sx={{marginLeft: '0px'}}
                variant={mod === activeModule ? 'contained' : 'outlined'}
                onClick={() => setActiveModule(mod)}
              >
                {mod.getTitle()}
              </Button>
            ))}
          </Stack>
        )}

        {/* Добавление элемента */}
        {activeModule && (
          <>
            <TextField
              label="Название элемента"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Оставьте пустым для автогенерации"
            />

            <Stack direction="row" spacing={2}>
              <Button onClick={() => addToActiveModule('lesson')} variant="outlined">
                Добавить урок
              </Button>
              <Button onClick={() => addToActiveModule('test')} variant="outlined">
                Добавить тест
              </Button>
              <Button onClick={() => addToActiveModule('assignment')} variant="outlined">
                Добавить задание
              </Button>
            </Stack>
          </>
        )}

        {/* Отображение курса */}
        <Stack spacing={2}>
          <Typography variant="h6">Содержание курса:</Typography>
          {modules.map((mod, idx) => (
            <Course
              key={idx}
              component={mod}
              modules={modules}
              setModules={notifyAndUpdate}
              onUpdate={() => notifyAndUpdate([...modules])}
              onDeleteModule={deleteModuleByTitle}
            />
          ))}
        </Stack>

        {/* Анализ */}
        <Button variant="contained" onClick={analyzeCourse}>
          Анализировать курс
        </Button>

        {analysis && (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
            {analysis}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
