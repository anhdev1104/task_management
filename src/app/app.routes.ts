import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectComponent } from './pages/project/project.component';
import { CreateComponent } from './pages/create/create.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TeamsComponent } from './pages/teams/teams.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
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
      {
        path: 'teams',
        component: TeamsComponent,
        title: 'Teams khu vực',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Đăng ký tài khoản',
      },
      {
        path: '',
        component: LoginComponent,
        title: 'Đăng nhập tài khoản',
      },
    ],
  },
];
