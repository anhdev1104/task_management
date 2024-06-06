import { IAccount } from './../../../core/interface/Account';
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
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
})
export class RegisterComponent {
  accounts = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  accountData!: IAccount;

  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {}

  handleRegister() {
    if (!this.accounts.valid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Thất bại, vui lòng kiểm tra lại form !',
      });
    }

    const postData: IAccount = {
      username: this.accounts.value.username as string,
      email: this.accounts.value.email as string,
      password: this.accounts.value.password as string,
    };

    this.accountService.addAccount(postData).subscribe(
      (data: IAccount) => {
        this.accountData = data;
        this.showSuccess();
        this.accounts.reset();
        setTimeout(() => this.router.navigate(['/']), 2500);
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
      detail: 'Tạo tài khoản thành công. Vui lòng đăng nhập để xác thực !',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Tại khoản của bạn đã tồn tại trong hệ thống.',
    });
  }
}
