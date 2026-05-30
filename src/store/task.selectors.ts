import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../Model/tast-state';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const TasksSelector = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectTaskById = (taskId: string) => createSelector(
  TasksSelector,
  (tasks) => tasks.find((task) => task.id === taskId)
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state) => state.error
);