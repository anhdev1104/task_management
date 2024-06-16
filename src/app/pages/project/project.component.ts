import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject } from '../../core/interface/Project';
import { ProjectService } from '../../core/services/project.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, ToastModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  providers: [MessageService],
})
export class ProjectComponent implements OnInit {
  projectData: IProject[] = [];
  project: any;
  constructor(
    private projectService: ProjectService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.projectService.getProject().subscribe((data: IProject[]) => {
      this.projectData = data;
    });
  }

  handleDeleteProject(id: string) {
    const isDeleteProject = confirm('Bạn có chắc muốn xóa dự án này không?');
    if (!isDeleteProject) return;

    this.projectService.deleteProject(id).subscribe((data) => {
      this.projectData = this.projectData.filter(
        (project) => project._id !== id
      );
      this.showSuccess();
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Dự án đã được xoá thành công.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Thao tác thất bại.',
    });
  }
}
