import { Component } from '@angular/core';
import { NavigateBarComponent } from '../../components/navigate-bar/navigate-bar.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { ContentComponent } from '../../layouts/content/content.component';
import { TeamMembersComponent } from '../../layouts/team-members/team-members.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    NavigateBarComponent,
    SidebarComponent,
    ContentComponent,
    TeamMembersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
