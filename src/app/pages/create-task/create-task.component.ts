import { TasksService } from './../../core/services/tasks.service';
import { AccountService } from './../../core/services/account.service';
import { ProjectService } from './../../core/services/project.service';
import { ITasks } from './../../core/interface/Tasks';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IProject } from '../../core/interface/Project';
import { IAccount } from '../../core/interface/Account';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [RouterLink, ToastModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
  providers: [MessageService],
})
export class CreateTaskComponent implements OnInit {
  projectsData: IProject[] = [];
  membersData: IAccount[] = [];
  tasks = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    project: new FormControl(''),
    level: new FormControl(''),
    assignee: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProject().subscribe((data) => {
      this.projectsData = data;
    });

    this.accountService.getAccounts().subscribe((data) => {
      this.membersData = data;
    });
  }

  handleAddTask() {
    if (!this.tasks.valid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Thất bại, vui lòng kiểm tra lại form !',
      });
    }

    const createTask = {
      name: this.tasks.value.name as string,
      description: this.tasks.value.description as string,
      project: this.tasks.value.project as string,
      level: this.tasks.value.level as string,
      assignee: this.tasks.value.assignee as string,
      status: this.tasks.value.status as string,
    };
    this.tasksService.addTasks(createTask).subscribe(
      (data) => {
        this.showSuccess();
        setTimeout(() => this.router.navigate(['/admin/tasks']), 1500);
      },
      (err) => console.log(err)
    );
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Tạo tasks thành công.',
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
