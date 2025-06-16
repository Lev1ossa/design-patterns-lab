import { CourseObserver } from './CourseObserver';
import { CourseComponentDTO } from '../../types/types';

export class LocalStorageObserver implements CourseObserver {
  update(data: CourseComponentDTO[]): void {
    try {
      localStorage.setItem('courseData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save course data:', e);
    }
  }
}
