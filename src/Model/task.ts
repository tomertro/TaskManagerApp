export interface Task{
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
}

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export enum TaskStatus {
    Todo = 0,
    InProgress = 1,
    Done = 2
}