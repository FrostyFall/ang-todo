import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogData } from 'src/app/models/dialogData.model';
import { Table } from 'src/app/models/table.model';
import { Task } from 'src/app/models/task.model';
import { Tag } from 'src/app/models/tag.model';

import { TasksTable } from 'src/app/models/tasksTable.model';
import { TasksService } from 'src/app/services/tasks.service';
import { TablesService } from 'src/app/services/tables.service';
import { TagsService } from 'src/app/services/tags.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tables!: Table[];
  tablesIds!: string[];
  tasksTables: TasksTable[] = [];
  tags: Tag[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private tablesService: TablesService,
    private tasksService: TasksService,
    private tagsService: TagsService
  ) {}

  public ngOnInit(): void {
    this.tablesService
      .getTables()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.tables = data;
          this.tablesIds = this.tables.map((val) => `list-${val.id}`);

          data.forEach((table: Table) =>
            this.tasksTables.push({ tableId: table.id, tasks: [] })
          );

          return this.tasksService.getTasks();
        })
      )
      .subscribe((data: Task[]) => {
        data.forEach((task: Task) => {
          const listIndex = this.tasksTables.findIndex(
            (table) => table.tableId === task.tableId
          );

          this.tasksTables[listIndex].tasks.push(task);
        });
      });

    this.tagsService.getTags().subscribe((data: Tag[]) => {
      this.tags = data;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddTask(data: DialogData, id: number): void {
    const listIndex = this.tasksTables.findIndex((obj) => obj.tableId === id);

    if (listIndex !== -1) {
      this.tasksService
        .addTask(data, id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log(res);
          this.tasksTables[listIndex].tasks.push(res.data);
        });
    }
  }

  public onClear(id: number): void {
    const listIndex = this.tasksTables.findIndex((obj) => obj.tableId === id);

    if (listIndex !== -1) {
      this.tasksService
        .clearTasks(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.tasksTables[listIndex].tasks.length = 0;
        });
    }
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    const currContainerId = +event.container.id.split('list-')[1];

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    let foundTask: Task | null = null;
    this.tasksTables[currContainerId].tasks.forEach((task) => {
      if (task.tableId !== currContainerId) {
        foundTask = task;
        foundTask.tableId = currContainerId;
      }
    });

    if (foundTask) {
      this.tasksService
        .updateTask(foundTask)
        .subscribe((res) => console.log(res));
    }
  }
}
