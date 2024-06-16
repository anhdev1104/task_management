import { AccountService } from './../../core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { IAccount } from '../../core/interface/Account';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  profileData!: IAccount;
  constructor(
    private profileService: AccountService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.profileAccount().subscribe(
      (data: IAccount) => {
        this.profileData = data || [];
      },
      (err) => {
        console.log('Error posting data', err);
      }
    );
  }

  handleLogout() {
    this.accountService.logoutAccount().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
