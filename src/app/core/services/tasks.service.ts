import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITasks } from '../interface/Tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITasks[]> {
    return this.http.get<ITasks[]>('tasks');
  }

  getTask(id: string): Observable<ITasks> {
    return this.http.get<ITasks>(`tasks/${id}`);
  }

  addTasks(data: ITasks): Observable<ITasks> {
    return this.http.post<ITasks>('tasks', data);
  }

  updateTasks(data: ITasks, id: any): Observable<ITasks> {
    return this.http.put<ITasks>(`tasks/${id}`, data);
  }

  deleteTask(id: string): Observable<ITasks> {
    return this.http.delete<ITasks>(`tasks/${id}`);
  }
}
