import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgClass, NgIf } from '@angular/common';

interface TeamMember {
  name: string;
  status: string;
}

interface Team {
  name: string;
  members: TeamMember[];
  isListMembersVisible: boolean; // To track visibility of members
}

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, NgClass, NgIf, HttpClientModule],
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css'],
})
export class TeamMembersComponent implements OnInit {
  teams: Team[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.http.get<Team[]>('http://localhost:3000/teams').subscribe((data) => {
      this.teams = data.map((team) => ({
        ...team,
        isListMembersVisible: false, // Initialize visibility to false
      }));
    });
  }

  toggleListMembers(index: number) {
    this.teams[index].isListMembersVisible =
      !this.teams[index].isListMembersVisible;
  }
}
