import { ProjectService } from './../../core/services/project.service';
import { Component } from '@angular/core';
import { IProject } from '../../core/interface/Project';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class CreateComponent {
  projectData!: IProject;

  project = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    startday: new FormControl(''),
    teamsize: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  handleCreateProject() {
    if (!this.project.valid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Thất bại, vui lòng kiểm tra lại form !',
      });
    }
    const createData: IProject = {
      name: this.project.value.name as string,
      description: this.project.value.description as string,
      startday: this.project.value.startday as string,
      teamsize: this.project.value.teamsize as string,
      status: this.project.value.status as string,
    };

    this.projectService.createProject(createData).subscribe(
      (data) => {
        this.showSuccess();
        setTimeout(() => this.router.navigate(['/admin/project']), 1500);
      },
      (err) => console.log(err)
    );
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Tạo dự án thành công.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Thao tác thất bại !',
    });
  }
}
