import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css',
})
export class TeamMembersComponent {
  isListMembers = false;

  toggleListMembers() {
    this.isListMembers = !this.isListMembers;
  }
}
