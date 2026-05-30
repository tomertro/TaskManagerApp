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
  private readonly baseUrl = environment.serverUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    if (this.offlineMode) {
      return of(task);
    }

    return this.http.post<Task>(`${this.baseUrl}/api/task`, task);
  }

  updateTask(task: Task): Observable<Task> {
    if (this.offlineMode) {
      return of(task);
    }

    return this.http.put<Task>(`${this.baseUrl}/api/task/${task.id}`, task);
  }

  deleteTask(taskId: string): Observable<string> {
    if (this.offlineMode) {
      return of(taskId);
    }

    return this.http.delete<void>(`${this.baseUrl}/api/task/${taskId}`).pipe(
      map(() => taskId)
    );
  }

  getTasks(): Observable<Task[]> {
    if (this.offlineMode) {
      return this.http.get<any[]>('assets/tasks.json').pipe(
        map((tasks) => tasks.map((task) => this.mapOfflineTask(task)))
      );
    }

    return this.http.get<Task[]>(`${this.baseUrl}/api/task`);
  }

  private mapOfflineTask(task: any): Task {
    return {
      id: String(task.id),
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status
    };
  }



}
