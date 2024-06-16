import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TasksService } from '../../core/services/tasks.service';
import { AccountService } from '../../core/services/account.service';
import { ProjectService } from '../../core/services/project.service';
import { MessageService } from 'primeng/api';
import { IAccount } from '../../core/interface/Account';
import { IProject } from '../../core/interface/Project';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-tasks',
  standalone: true,
  imports: [RouterLink, ToastModule, ReactiveFormsModule],
  templateUrl: './update-tasks.component.html',
  styleUrl: './update-tasks.component.css',
  providers: [MessageService],
})
export class UpdateTasksComponent implements OnInit {
  projectsData: IProject[] = [];
  membersData: IAccount[] = [];
  tasksForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasksForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      project: ['', Validators.required],
      level: ['', Validators.required],
      assignee: ['', Validators.required],
      status: ['', Validators.required],
    });

    const tasksId = this.route.snapshot.paramMap.get('id');

    if (tasksId) {
      this.tasksService.getTask(tasksId).subscribe((project) => {
        this.tasksForm.patchValue(project);
      });
    }

    this.projectService.getProject().subscribe((data) => {
      this.projectsData = data;
    });

    this.accountService.getAccounts().subscribe((data) => {
      this.membersData = data;
      console.log(data);
    });
  }

  handleUpdateTask() {
    if (this.tasksForm.valid) {
      const tasksId = this.route.snapshot.paramMap.get('id');
      this.tasksService.updateTasks(this.tasksForm.value, tasksId).subscribe(
        () => {
          this.showSuccess();
          setTimeout(() => this.router.navigate(['/admin/tasks']), 1500);
        },
        (error) => {
          console.error('Error updating tasks:', error);
        }
      );
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Cập nhập tasks thành công.',
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
