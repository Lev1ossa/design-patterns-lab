import { CourseComponentDTO } from "../../types/types";
import { Visitor } from "../visitor/CourseVisitor";

export interface CourseComponent {
  getTitle(): string;
  getType(): string;
  getChildren(): CourseComponent[];
  getState?(): string;
  toggleState?(): void;
  isRequired?(): boolean;
  toJSON(): CourseComponentDTO;
  accept(visitor: Visitor): void;
}
