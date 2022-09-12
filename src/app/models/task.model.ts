import { Tag } from './tag.model';

export interface Task {
  id: number;
  title: string;
  tableId: number;
  tagsIds: Tag[] | [];
}
