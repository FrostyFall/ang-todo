import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialogData.model';

import { MatChip, MatChipList } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild('tagsList') tagsList!: MatChipList;
  @ViewChild('noneTag') noneTag!: MatChip;

  tags: Tag[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.tags = this.data.tags;
  }

  public onAddTask(): void {
    if ((<MatChip[]>this.tagsList.selected).length === 0) {
      this.data.selectedTags = [];
      return;
    }

    const chipsValues = (<MatChip[]>this.tagsList.selected).map(
      (chip) => chip.value
    );
    const selectedTags = this.data.tags.filter((tag) =>
      chipsValues.includes(tag.title)
    );

    this.data.selectedTags = selectedTags;
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSelect(tag: MatChip): void {
    tag.toggleSelected();

    if (this.noneTag.selected) {
      this.noneTag.deselect();
    }
  }

  public onNoneSelect(): void {
    if (!this.noneTag.selected) {
      (<MatChip[]>this.tagsList.selected).forEach((tag) => {
        tag.selected = false;
      });

      this.noneTag.select();
    }
  }
}
