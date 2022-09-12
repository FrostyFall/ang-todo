import { Tag } from './tag.model';

export interface DialogData {
  task: string;
  selectedTags: Tag[];
  tags: Tag[];
}
