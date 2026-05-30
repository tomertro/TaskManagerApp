import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LocaleService } from '../app/i18n/locale.service';
import { translations } from '../app/i18n/translations';
import { Task, TaskPriority, TaskStatus } from '../Model/task';
import { AppState } from '../store/app.state';
import { AddTask } from '../store/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  standalone: false,
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  taskForm: FormGroup;
  statusOptions =[
    { value: TaskStatus.Todo, label: this.localeService.t('statusTodo') },
    { value: TaskStatus.InProgress, label: this.localeService.t('statusInProgress') },
    { value: TaskStatus.Done, label: this.localeService.t('statusDone') }
  ];
  priorityOptions = [
    { value: TaskPriority.Low, label: this.localeService.t('priorityLow') },
    { value: TaskPriority.Medium, label: this.localeService.t('priorityMedium') },
    { value: TaskPriority.High, label: this.localeService.t('priorityHigh') }
  ];
  constructor(
    private fb: FormBuilder,
    private localeService: LocaleService,
    private store: Store<AppState>,private router:Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  get currentDirection(): 'rtl' | 'ltr' {
    return this.localeService.currentDirection;
  }

  t(key: keyof (typeof translations)['en-US']): string {
    return this.localeService.t(key);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const task: Task = {
        id: crypto.randomUUID(),
        title: formValue.title,
        description: formValue.description,
        priority: formValue.priority as TaskPriority,
        dueDate: formValue.dueDate,
        status: formValue.status as TaskStatus
      };

      this.store.dispatch(new AddTask(task));
      this.router.navigate(['/']);
    }
  }
}
