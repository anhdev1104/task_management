import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import ITeams from '../../core/interface/Teams';
import { TeamService } from '../../core/services/teams.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  teamsData: ITeams[] = [];

  teams = new FormGroup({
    team: new FormControl('', Validators.required),
  });

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(
      (data) => {
        this.teamsData = data;
        console.log(this.teamsData);
      },
      (error) => console.log('Error fetching data: ', error)
    );
  }

  handleAddTeam() {
    alert(this.teams.value.team);
  }
}
