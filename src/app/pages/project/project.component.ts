import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {}
