import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../interface/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>('project');
  }

  getProjectById(id: string): Observable<IProject> {
    return this.http.get<IProject>(`project/${id}`);
  }

  createProject(data: IProject): Observable<IProject> {
    return this.http.post<IProject>('project', data);
  }

  updateProject(id: string | null, data: IProject): Observable<IProject> {
    return this.http.put<IProject>(`project/${id}`, data);
  }

  deleteProject(id: string): Observable<IProject> {
    return this.http.delete<IProject>(`project/${id}`);
  }
}
