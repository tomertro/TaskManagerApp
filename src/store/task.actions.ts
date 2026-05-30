import { Task } from '../Model/task';

export enum TaskActionType {
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  AddTaskFailure = '[Task] Add Task Failure',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Update Task Success',
  UpdateTaskFailure = '[Task] Update Task Failure',
  DeleteTask = '[Task] Delete Task',
  DeleteTaskSuccess = '[Task] Delete Task Success',
  DeleteTaskFailure = '[Task] Delete Task Failure',
  GetTasks = '[Task] Get Tasks',
  GetTasksSuccess = '[Task] Get Tasks Success',
  GetTasksFailure = '[Task] Get Tasks Failure'
}

export class AddTask {
  readonly type = TaskActionType.AddTask;

  constructor(public payload: Task) {}
}

export class AddTaskSuccess {
  readonly type = TaskActionType.AddTaskSuccess;

  constructor(public payload: Task) {}
}

export class AddTaskFailure {
  readonly type = TaskActionType.AddTaskFailure;

  constructor(public payload: string) {}
}

export class UpdateTask {
  readonly type = TaskActionType.UpdateTask;

  constructor(public payload: Task) {}
}

export class UpdateTaskSuccess {
  readonly type = TaskActionType.UpdateTaskSuccess;

  constructor(public payload: Task) {}
}

export class UpdateTaskFailure {
  readonly type = TaskActionType.UpdateTaskFailure;

  constructor(public payload: string) {}
}

export class DeleteTask {
  readonly type = TaskActionType.DeleteTask;

  constructor(public payload: string) {}
}

export class DeleteTaskSuccess {
  readonly type = TaskActionType.DeleteTaskSuccess;

  constructor(public payload: string) {}
}

export class DeleteTaskFailure {
  readonly type = TaskActionType.DeleteTaskFailure;

  constructor(public payload: string) {}
}

export class GetTasks {
  readonly type = TaskActionType.GetTasks;
}

export class GetTasksSuccess {
  readonly type = TaskActionType.GetTasksSuccess;

  constructor(public payload: Task[]) {}
}

export class GetTasksFailure {
  readonly type = TaskActionType.GetTasksFailure;

  constructor(public payload: string) {}
}

export type TaskActions = AddTask | AddTaskSuccess | AddTaskFailure | UpdateTask | UpdateTaskSuccess | UpdateTaskFailure | DeleteTask | DeleteTaskSuccess | DeleteTaskFailure | GetTasks | GetTasksSuccess | GetTasksFailure;
