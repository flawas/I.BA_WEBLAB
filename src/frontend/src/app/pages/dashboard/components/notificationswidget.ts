import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LogService } from '../../service/log.service';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-notifications-widget',
  imports: [ButtonModule, MenuModule, TableModule],
  template: `
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <div class="font-semibold text-xl">Notifications</div>
      </div>
      <p-table [value]="logs" dataKey="id">
        <ng-template #body let-log>
          <span class="block text-muted-color font-medium mb-4">{{ log.creationDate }}</span>
          <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
              <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                <i [classList]="log.icon"></i>
              </div>
              <div>
                <span class="font-semibold">{{ log.service }}</span> | <span class="text-muted">{{ log.description }}</span>
                | <span class="text-muted">{{ log.creationTime }}</span>
              </div>
            </li>
          </ul>
        </ng-template>
      </p-table>
    </div>`,
  providers: [LogService, DatePipe]
})
export class NotificationsWidget implements OnInit {
  logs: any[] = [];

  constructor(
    private logService: LogService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.logService.getPublicLogs().subscribe((logs) => {
      this.logs = logs.map((log: any) => ({
        id: log._id,
        service: log.service,
        severity: log.severity,
        description: log.description,
        creationDate: this.datePipe.transform(log.creationDate, 'dd.MM.yyyy'),
        creationTime: this.datePipe.transform(log.creationDate, 'HH:mm'),
        icon: this.getIcon(log.service)
      }));
    });
  }

  getIcon(service: string): string {
    if (service === 'Auth service') {
      return 'pi pi-user !text-xl text-black';
    }

    if(service == 'Category service') {
      return 'pi pi-bars text-orange-500 !text-xl';
    }

    if(service == 'Rings service') {
      return 'pi pi-spinner text-purple-500 !text-xl';
    }

    return 'pi pi-question-circle'; // Default icon or handle other services
  }

}
