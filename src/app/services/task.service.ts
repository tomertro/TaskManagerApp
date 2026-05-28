import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskPriority, TaskStatus } from '../../Model/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly offlineMode = environment.offlinemode;

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    if (this.offlineMode) {
      return of(task);
    }

    return this.http.post<Task>('/addTask', task);
  }

  getTasks(): Observable<Task[]> {
    if (this.offlineMode) {
      return this.http.get<any[]>('assets/tasks.json').pipe(
        map((tasks) => tasks.map((task) => this.mapOfflineTask(task)))
      );
    }

    return this.http.get<Task[]>('/getTasks');
  }

  private mapOfflineTask(task: any): Task {
    return {
      id: String(task.id),
      title: task.title,
      description: task.description,
      priority: this.mapPriority(task.priority),
      dueDate: task.dueDate,
      status: this.mapStatus(task.status)
    };
  }

  private mapPriority(priority: string | number): TaskPriority {
    switch (String(priority).trim().toLowerCase()) {
      case 'גבוהה':
      case 'high':
        return TaskPriority.High;
      case 'בינונית':
      case 'medium':
        return TaskPriority.Medium;
      case 'נמוכה':
      case 'low':
      default:
        return TaskPriority.Low;
    }
  }

  private mapStatus(status: string | number): TaskStatus {
    switch (String(status).trim().toLowerCase()) {
      case 'בתהליך':
      case 'inprogress':
      case 'in progress':
        return TaskStatus.InProgress;
      case 'הושלם':
      case 'done':
        return TaskStatus.Done;
      case 'ממתין':
      case 'todo':
      default:
        return TaskStatus.Todo;
    }
  }
}
