import { Component } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { ContentComponent } from '../../layouts/content/content.component';
import { TeamMembersComponent } from '../../layouts/team-members/team-members.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ContentComponent, TeamMembersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
