import { TasksService } from './../../core/services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ITasks } from '../../core/interface/Tasks';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, ToastModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [MessageService],
})
export class TasksComponent implements OnInit {
  tasksData: ITasks[] = [];

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasksData = data;
    });
  }

  handleDeleteTask(id: string) {
    const isDeleteTasks = confirm('Bạn có chắc muốn xóa tasks này không?');
    if (!isDeleteTasks) return;

    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasksData = this.tasksData.filter((task) => task._id !== id);
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
}
