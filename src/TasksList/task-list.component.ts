import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocaleService } from '../app/i18n/locale.service';
import { translations } from '../app/i18n/translations';
import { Task, TaskPriority, TaskStatus } from '../Model/task';
import { AppState } from '../store/app.state';
import { GetTasks } from '../store/task.actions';
import { TasksSelector } from '../store/task.selectors';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(
    private localeService: LocaleService,
    private store: Store<AppState>
  ) {
    this.tasks$ = this.store.select(TasksSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTasks());
  }

  get currentDirection(): 'rtl' | 'ltr' {
    return this.localeService.currentDirection;
  }

  t(key: keyof (typeof translations)['en-US']): string {
    return this.localeService.t(key);
  }

  getPriorityLabel(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.High:
        return this.t('priorityHigh');
      case TaskPriority.Medium:
        return this.t('priorityMedium');
      default:
        return this.t('priorityLow');
    }
  }

  getStatusLabel(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.InProgress:
        return this.t('statusInProgress');
      case TaskStatus.Done:
        return this.t('statusDone');
      default:
        return this.t('statusTodo');
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
