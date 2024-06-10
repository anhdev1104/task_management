import { IAccount } from './../../core/interface/Account';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TeamService } from '../../core/services/teams.service';
import ITeams from '../../core/interface/Teams';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  profileData!: IAccount;
  teamsData: ITeams[] = [];
  profileUpdate = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    team: new FormControl(''),
    role: new FormControl(''),
    avatar: new FormControl(''),
  });

  userId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private profileService: AccountService,
    private messageService: MessageService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy userId từ URL params
    this.userId = this.route.snapshot.paramMap.get('id');

    // Fetch profile data
    this.profileService.profileAccount().subscribe(
      (data: IAccount) => {
        this.profileData = data;
        this.initializeForm(); // Initialize form with the fetched profile data
      },
      (err) => {
        console.log('Error fetching profile data', err);
      }
    );

    // Fetch team data
    this.teamService.getTeams().subscribe(
      (data: ITeams[]) => {
        this.teamsData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initializeForm(): void {
    this.profileUpdate.setValue({
      username: this.profileData.username || '',
      email: this.profileData.email || '',
      team:
        typeof this.profileData.team === 'string'
          ? this.profileData.team
          : this.profileData.team
          ? this.profileData.team.name
          : null,
      role: this.profileData.role || '',
      avatar: null,
    });
  }

  onFileSelected(event: any): void {
    const file: string = event.target.value;
    this.profileUpdate.setValue({
      username: this.profileData.username || '',
      email: this.profileData.email || '',
      team:
        typeof this.profileData.team === 'string'
          ? this.profileData.team
          : this.profileData.team
          ? this.profileData.team.name
          : null,
      role: this.profileData.role || '',
      avatar: null,
    });
  }

  handleUpdateProfile(): void {
    if (this.profileUpdate.valid && this.userId) {
      // Lấy các giá trị từ form
      const { avatar, username, email, team, role } = this.profileUpdate.value;

      // Chuyển đổi giá trị null thành chuỗi trống
      const profileData: IAccount = {
        username: username || '',
        email: email || '',
        team: (team as any) || null,
        role: role || '',
      };

      if (avatar) {
        // Xử lý cập nhật avatar nếu có
        this.profileService
          .updateAccount({ avatar, ...profileData }, this.userId)
          .subscribe(
            (data: IAccount) => {
              this.profileData = data;
              this.showSuccess();
              setTimeout(
                () => this.router.navigate(['/admin/dashboard']),
                1500
              );
            },
            (err) => {
              console.log(err);
              this.showError();
            }
          );
      } else {
        // Cập nhật thông tin mà không có avatar
        this.profileService.updateAccount(profileData, this.userId).subscribe(
          (data: IAccount) => {
            this.profileData = data;
            this.showSuccess();
            setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500);
          },
          (err) => {
            console.log(err);
            this.showError();
          }
        );
      }
    }
  }

  showSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cập nhật thành công.',
    });
  }

  showError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Cập nhật thông tin thất bại',
    });
  }
}
