import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectComponent } from './pages/project/project.component';
import { CreateComponent } from './pages/create/create.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'project',
    component: ProjectComponent,
    title: 'Dự án',
  },
  {
    path: 'create',
    component: CreateComponent,
    title: 'Tạo dự án',
  },
  {
    path: 'create-task',
    component: CreateTaskComponent,
    title: 'Tạo task',
  },
];
