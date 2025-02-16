import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { TechnologiesWidget } from './components/technologies-widget.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatsWidget, TechnologiesWidget, NotificationsWidget],
  template: `
      <ng-container *ngIf="isLoggedIn">
        <div class="grid grid-cols-12 gap-8">
          <app-stats-widget class="contents" />
          <div class="col-span-12 xl:col-span-8">
            <app-technologies-overview />
          </div>
          <div class="col-span-12 xl:col-span-4">
            <app-notifications-widget />
          </div>
        </div>
      </ng-container>
    `
})
export class Dashboard implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.isLoggedIn = await this.userService.isLoggedIn();
  }
}
