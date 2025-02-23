import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
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
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {RingService} from '../service/ring.service';
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
    TextareaModule, ToastModule,  TableModule
  ],
  template: `
    <p-toast></p-toast>
    <p-fluid class="flex flex-col ms-auto gap-8">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Create ring</div>

        <p-floatlabel variant="on">
          <input pInputText id="RingName" [(ngModel)]="RingName"/>
          <label for="RingName">Name of Ring</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <input pInputText id="RingLevel" [(ngModel)]="RingLevel"/>
          <label for="RingLevel">Level of Ring</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <textarea pTextarea id="RingDescription" [(ngModel)]="RingDescription" rows="5" cols="30"
                    style="resize: none" class="h-full"></textarea>
          <label for="RingDescription">Description of technology</label>
        </p-floatlabel>

        <p-button
          label="Save new ring"
          icon="pi pi-check" (onClick)="saveRing()" [disabled]="!RingName || !RingDescription ||!RingLevel"/>
      </div>
      <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Rings</div>
        <p-table [value]="rings" dataKey="id" editMode="row" [paginator]="true" [rows]="5"
                 responsiveLayout="scroll">
          <ng-template #header>
            <tr>
              <th pSortableColumn="name">Name
                <p-sortIcon field="name"></p-sortIcon>
              </th>
              <th pSortableColumn="published">Description
                <p-sortIcon field="published"></p-sortIcon>
              </th>
              <th pSortableColumn="level">Level
                <p-sortIcon field="level"></p-sortIcon>
              </th>
              <th style="width:20%"></th>
            </tr>
          </ng-template>
          <ng-template #body let-ring let-editing="editing" let-ri="rowIndex">
            <tr [pEditableRow]="ring">
              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="ring.name"/>
                  </ng-template>
                  <ng-template #output>
                    {{ ring.name }}
                  </ng-template>
                </p-cellEditor>
              </td>

              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="ring.description"/>
                  </ng-template>
                  <ng-template #output>
                    {{ ring.description }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="ring.level"/>
                  </ng-template>
                  <ng-template #output>
                    {{ ring.level }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button
                    *ngIf="!editing"
                    pButton
                    pRipple
                    type="button"
                    pInitEditableRow
                    icon="pi pi-pencil"
                    text
                    rounded
                    severity="secondary"
                  ></button>
                  <button
                    *ngIf="!editing"
                    pButton
                    pRipple
                    type="button"
                    pInitEditableRow
                    icon="pi pi-times"
                    (click)="onRowDelete(ring.id)"
                    text
                    rounded
                    severity="secondary"
                  ></button>
                  <button
                    *ngIf="editing"
                    pButton
                    pRipple
                    type="button"
                    pSaveEditableRow
                    icon="pi pi-check"
                    (click)="onRowEditSave(ring)"
                    text
                    rounded
                    severity="secondary"
                  ></button>
                  <button
                    *ngIf="editing"
                    pButton
                    pRipple
                    type="button"
                    pCancelEditableRow
                    icon="pi pi-times"
                    text
                    rounded
                    severity="secondary"
                  ></button>
                </div>
              </td>
            </tr>
          </ng-template>


          <ng-template #body let-ring>
            <tr>
              <td style="width: 25%; min-width: 10rem;">{{ ring.name }}</td>
              <td style="width: 75%; min-width: 25rem;">{{ ring.description }}</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </p-fluid>

  `,
  providers: [NodeService, RingService, MessageService]
})
export class InputRing implements OnInit{

  users!: any[];

  RingDescription: string = '';
  RingName: string = '';
  RingLevel: number = 0;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }


  ngOnInit() {

  }
}
