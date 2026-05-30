import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskService } from '../app/services/task.service';
import { AppState } from './app.state';
import { AddTask, AddTaskFailure, AddTaskSuccess, DeleteTask, DeleteTaskFailure, DeleteTaskSuccess, GetTasks, GetTasksFailure, GetTasksSuccess, TaskActionType, UpdateTask, UpdateTaskFailure, UpdateTaskSuccess } from './task.actions';
import { TasksSelector } from './task.selectors';

@Injectable()
export class TaskEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionType.AddTask),
      switchMap((action: AddTask) =>
        this.taskService.addTask(action.payload).pipe(
          map((task) => new AddTaskSuccess(task)),
          catchError((error) => of(new AddTaskFailure(error?.message || 'Failed to add task')))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionType.UpdateTask),
      switchMap((action: UpdateTask) =>
        this.taskService.updateTask(action.payload).pipe(
          map((task) => new UpdateTaskSuccess(task)),
          catchError((error) => of(new UpdateTaskFailure(error?.message || 'Failed to update task')))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionType.DeleteTask),
      switchMap((action: DeleteTask) =>
        this.taskService.deleteTask(action.payload).pipe(
          map((taskId) => new DeleteTaskSuccess(taskId)),
          catchError((error) => of(new DeleteTaskFailure(error?.message || 'Failed to delete task')))
        )
      )
    )
  );

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionType.GetTasks),
      withLatestFrom(this.store.select(TasksSelector)),
      switchMap(([, tasks]) => {
        if (tasks.length > 0) {
          return of(new GetTasksSuccess(tasks));
        }

        return this.taskService.getTasks().pipe(
          map((loadedTasks) => new GetTasksSuccess(loadedTasks)),
          catchError((error) => of(new GetTasksFailure(error?.message || 'Failed to load tasks')))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}
}
