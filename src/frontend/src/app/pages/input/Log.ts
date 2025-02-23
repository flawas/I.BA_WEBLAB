import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NodeService } from '../service/node.service';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {LogService} from '../service/log.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    SelectButtonModule,
    InputGroupModule,
    FluidModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    AutoCompleteModule,
    InputNumberModule,
    SliderModule,
    RatingModule,
    ColorPickerModule,
    KnobModule,
    SelectModule,
    DatePickerModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    TreeSelectModule,
    MultiSelectModule,
    ListboxModule,
    InputGroupAddonModule,
    TextareaModule, ToastModule,  TableModule, TagModule
  ],
  template: `
    <p-fluid class="flex flex-col ms-auto gap-8">
      <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Logs</div>
        <p-table [value]="logs" dataKey="id" editMode="row" [paginator]="true" [rows]="30"
                 responsiveLayout="scroll">
          <ng-template #header>
            <tr>
              <th pSortableColumn="name">Log ID
                <p-sortIcon field="name"></p-sortIcon>
              </th>
              <th pSortableColumn="service">Service
                <p-sortIcon field="service"></p-sortIcon>
              </th>
              <th pSortableColumn="severity">Severity
                <p-sortIcon field="severity"></p-sortIcon>
              </th>
              <th pSortableColumn="user">User
                <p-sortIcon field="user"></p-sortIcon>
              </th>
              <th pSortableColumn="published">Description
                <p-sortIcon field="published"></p-sortIcon>
              </th>
              <th pSortableColumn="date">Date
                <p-sortIcon field="date"></p-sortIcon>
              </th>
              <th pSortableColumn="time">Time
                <p-sortIcon field="time"></p-sortIcon>
              </th>
            </tr>
          </ng-template>
          <ng-template #body let-log let-editing="editing" let-ri="rowIndex">
            <tr>
              <td>{{ log.id }}</td>
              <td>{{ log.service }}</td>
              <td>
                <p-tag [value]="log.severity" [severity]="getSeverity(log.severity)" />
              </td>
              <td>{{ log.user }}</td>
              <td>{{ log.description }}</td>
              <td>{{ log.createDate }}</td>
              <td>{{ log.createTime }}</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </p-fluid>

  `,
  providers: [NodeService, LogService, DatePipe]
})
export class LogView implements OnInit{

  logs!: any[];

  constructor(
    private logService: LogService,
    private datePipe: DatePipe,
    private userService: UserService
  ) { }



  async ngOnInit() {
    await this.userService.isLoggedIn();
    this.logService.getAllLogs().subscribe((data) => {
      this.logs = data.map((log: any) => {
        return {
          id: log._id,
          service: log.service,
          severity: log.severity,
          user: log.user,
          description: log.description,
          createDate: this.datePipe.transform(log.creationDate, 'dd.MM.yyyy'),
          createTime: this.datePipe.transform(log.creationDate, 'HH:mm:ss'),
        };
      });
    });
  }

  getSeverity(severity: string): any {
    if(severity === 'debug') {
      return 'success';
    }

    if(severity === 'info') {
      return 'info';
    }

    if(severity === 'warn') {
      return 'warn';
    }

    if(severity === 'error') {
      return 'danger';
    }
  }


}
