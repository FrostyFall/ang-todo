import { Task } from './task.model';

export interface TasksTable {
  tableId: number;
  tasks: Task[];
}
