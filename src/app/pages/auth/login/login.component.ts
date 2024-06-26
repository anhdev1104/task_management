import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { IAccount } from '../../../core/interface/Account';
import { AccountService } from '../../../core/services/account.service';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  accounts = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  accountData!: IAccount;

  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  handleLogin() {
    if (!this.accounts.valid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Thất bại, vui lòng kiểm tra lại form !',
      });
    }

    const loginData: IAccount = {
      email: this.accounts.value.email as string,
      password: this.accounts.value.password as string,
    };

    this.accountService.loginAccount(loginData).subscribe(
      (data: IAccount) => {
        // Lưu accessToken vào cookie
        this.cookieService.set('accessToken', data.accessToken);
        this.cookieService.set('refreshToken', data.refreshToken);

        this.accountData = data;
        this.accounts.reset();
        this.router.navigate(['/admin/dashboard']);
        this.showSuccess();
      },
      (err) => {
        console.log('Error posting data', err);
        this.showError();
      }
    );
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Đăng nhập thành công.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Tài khoản hoặc mật khẩu của bạn chưa chính xác !',
    });
  }
}
