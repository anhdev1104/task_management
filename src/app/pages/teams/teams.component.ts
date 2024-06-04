import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import ITeams from '../../core/interface/Teams';
import { TeamService } from '../../core/services/teams.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
  providers: [MessageService],
})
export class TeamsComponent implements OnInit {
  teamsData: ITeams[] = [];

  teams = new FormGroup({
    team: new FormControl('', Validators.required),
  });

  constructor(
    private teamService: TeamService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(
      (data: ITeams[]) => (this.teamsData = data),
      (error) => console.log('Error fetching data: ', error)
    );
  }

  handleAddTeam() {
    const postData: ITeams = {
      name: this.teams.value.team as string,
    };

    this.teamService.addTeam(postData).subscribe(
      (data: ITeams) => {
        this.teamsData.push(data);
        this.showSuccess();
        this.teams.reset();
      },
      (error) => {
        console.log('Error posting data', error);
        this.showError();
      }
    );
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Đã thêm thành công team khu vực.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Thêm thất bại.',
    });
  }
}
