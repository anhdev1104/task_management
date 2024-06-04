import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ITeams from '../interface/Teams';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<ITeams[]> {
    return this.http.get<ITeams[]>('/teams');
  }

  addTeam(data: ITeams): Observable<ITeams> {
    return this.http.post<ITeams>('/teams', data);
  }
}
