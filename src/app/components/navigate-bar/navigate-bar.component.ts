import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navigate-bar',
  standalone: true,
  templateUrl: './navigate-bar.component.html',
  styleUrls: ['./navigate-bar.component.css'],
})
export class NavigateBarComponent implements OnInit {
  title: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const currentRoute = this.router.config.find((route) => {
            const path = route.path ?? ''; // Cung cấp giá trị mặc định
            return this.router.isActive(path, true);
          });
          return currentRoute?.title ?? 'Default Title';
        })
      )
      .subscribe((title: any) => {
        this.title = title || 'Default Title';
      });
  }
}
