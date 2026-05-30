import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscriber, Subscription } from 'rxjs';
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
  
  taskId:any = '';
  subscribers:Array<Subscription> = [];
  
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
  this.subscribers.push( this.activatedRoute.paramMap.subscribe(param=>{
        this.taskId = param.get('id');
     }))  ;
  this.subscribers.push( this.store.select(selectTaskById(this.taskId)).subscribe(t=>{
    if (t) {
        this.taskForm.patchValue(t);
      }
  }))
  
   
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(item => item.unsubscribe());
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
