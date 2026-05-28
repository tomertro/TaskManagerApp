import { Task } from './task';

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}