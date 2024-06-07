import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { ContentComponent } from '../../layouts/content/content.component';
import { TeamMembersComponent } from '../../layouts/team-members/team-members.component';
import { IAccount } from '../../core/interface/Account';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ContentComponent, TeamMembersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // @Output() profileDataEvent = new EventEmitter<IAccount>();
  profileData!: IAccount;
  constructor(private profileService: AccountService) {}

  ngOnInit(): void {
    this.profileService.profileAccount().subscribe(
      (data: IAccount) => {
        this.profileData = data;
        // this.profileDataEvent.emit(this.profileData);
      },
      (err) => {
        console.log('Error posting data', err);
      }
    );
  }
}
