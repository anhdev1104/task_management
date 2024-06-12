import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],
  providers: [MessageService],
})
export class UpdateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startday: ['', Validators.required],
      teamsize: ['', Validators.required],
      status: ['', Validators.required],
    });

    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.projectForm.patchValue(project);
      });
    }
  }

  handleUpdateProject(): void {
    if (this.projectForm.valid) {
      const projectId = this.route.snapshot.paramMap.get('id');
      this.projectService
        .updateProject(projectId, this.projectForm.value)
        .subscribe(
          () => {
            this.showSuccess();
            setTimeout(() => this.router.navigate(['/admin/project']), 1500);
          },
          (error) => {
            console.error('Error updating project:', error);
          }
        );
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cập nhập dự án thành công.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Cập nhập dự án thất bại !',
    });
  }
}
