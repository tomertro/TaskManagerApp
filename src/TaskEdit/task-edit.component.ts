import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { LocaleService } from '../app/i18n/locale.service';
import { translations } from '../app/i18n/translations';
import { Task, TaskPriority, TaskStatus } from '../Model/task';
import { AppState } from '../store/app.state';
import { GetTasks, UpdateTask } from '../store/task.actions';
import { selectTaskById } from '../store/task.selectors';

@Component({
  selector: 'app-task-edit',
  standalone: false,
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  private destroy$ = new Subject<void>();

  statusOptions = [
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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localeService: LocaleService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),      
      switchMap((id) => this.store.select(selectTaskById(id))),
      takeUntil(this.destroy$)
    ).subscribe((task) => {
      if (task) {
        this.taskForm.patchValue(task);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentDirection(): 'rtl' | 'ltr' {
    return this.localeService.currentDirection;
  }

  t(key: keyof (typeof translations)['en-US']): string {
    return this.localeService.t(key);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const taskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!taskId) {
      return;
    }

    const formValue = this.taskForm.value;
    const updatedTask: Task = {
      id: taskId,
      title: formValue.title,
      description: formValue.description,
      priority: formValue.priority as TaskPriority,
      dueDate: formValue.dueDate,
      status: formValue.status as TaskStatus
    };

    this.store.dispatch(new UpdateTask(updatedTask));
    this.router.navigate(['/']);
  }
}
