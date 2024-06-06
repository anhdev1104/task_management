import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { TeamService } from '../../core/services/teams.service';
import ITeams from '../../core/interface/Teams';

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
  teamsData: ITeams[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService.getTeams().subscribe(
      (data: ITeams[]) => {
        this.teamsData = data.map((team) => ({
          ...team,
          isListMembersVisible: false, // Initialize visibility to false
        }));
      },
      (err) => console.log(err)
    );
  }

  // fetchTeams() {
  //   this.http.get<Team[]>('http://localhost:3000/teams').subscribe((data) => {
  //     this.teams = data.map((team) => ({
  //       ...team,
  //       isListMembersVisible: false, // Initialize visibility to false
  //     }));
  //   });
  // }

  toggleListMembers(index: number) {
    this.teamsData[index].isListMembersVisible =
      !this.teamsData[index].isListMembersVisible;
  }
}
