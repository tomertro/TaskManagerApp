import { TaskState } from '../Model/tast-state';
import { TaskActions, TaskActionType } from './task.actions';

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export function taskReducer(state: TaskState = initialTaskState, action: TaskActions): TaskState {
  switch (action.type) {
    case TaskActionType.AddTask:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TaskActionType.AddTaskSuccess:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null
      };

    case TaskActionType.AddTaskFailure:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case TaskActionType.GetTasks:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TaskActionType.GetTasksSuccess:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null
      };

    case TaskActionType.GetTasksFailure:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
