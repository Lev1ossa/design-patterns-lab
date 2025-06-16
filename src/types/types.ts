export type CourseBlockType = 'lesson' | 'test' | 'assignment';

export interface CourseBlock {
  type: CourseBlockType;
  title: string;
}

export interface CourseComponentDTO {
  type: string;
  title: string;
  state?: string;
  required?: boolean;
  children?: CourseComponentDTO[];
}