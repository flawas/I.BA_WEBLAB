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
import { PasswordModule } from 'primeng/password';

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
    TextareaModule, ToastModule,  TableModule, PasswordModule
  ],
  template: `
    <p-toast></p-toast>
    <p-fluid class="flex flex-col ms-auto gap-8">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Create user</div>
        <p-floatlabel variant="on">
          <input pInputText id="userName" [(ngModel)]="userName"/>
          <label for="userName">Username</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <input pInputText id="userMail" [(ngModel)]="userMail"/>
          <label for="userMail">Mail</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <p-password id="userPassword" [(ngModel)]="userPassword"/>
          <label for="userPassword">Password</label>
        </p-floatlabel>

        <p-button
          label="Create new user" (click)="saveUser()"
          icon="pi pi-check"  [disabled]="!userName || !userPassword ||!userMail"/>
      </div>
      <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Users</div>
        <p-table [value]="users" dataKey="id" editMode="row" [paginator]="true" [rows]="5"
                 responsiveLayout="scroll">
          <ng-template #header>
            <tr>
              <th pSortableColumn="id">UserID
                <p-sortIcon field="id"></p-sortIcon>
              </th>
              <th pSortableColumn="name">Username
                <p-sortIcon field="name"></p-sortIcon>
              </th>
              <th pSortableColumn="mail">Mail
                <p-sortIcon field="mail"></p-sortIcon>
              </th>
              <th pSortableColumn="roles">Roles
                <p-sortIcon field="roles"></p-sortIcon>
              </th>
              <th style="width:20%"></th>
            </tr>
          </ng-template>
          <ng-template #body let-user let-editing="editing" let-ri="rowIndex">
            <tr [pEditableRow]="user">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>

              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="user.mail"/>
                  </ng-template>
                  <ng-template #output>
                    {{ user.mail }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="user.roles"/>
                  </ng-template>
                  <ng-template #output>
                    {{ user.roles }}
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
                    (click)="onRowDelete(user.id)"
                    icon="pi pi-times"
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
                    (click)="onRowEditSave(user)"
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


        </p-table>
      </div>
    </p-fluid>
  `,
  providers: [NodeService, RingService, MessageService]
})
export class InputUsers implements OnInit{

  users!: any[];

  userName: string = '';
  userMail: string = '';
  userPassword: string = ''

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }


  async ngOnInit() {
    await this.userService.isLoggedIn();
    await this.userService.isAdmin();

    this.userService.getAll().subscribe((data) => {
      this.users = data.map((User: any) => {
        return {
          id: User._id,
          username: User.username,
          mail: User.mail,
          roles: User.roles,
          creationDate: User.creationDate,
          lastUpdate: User.lastUpdate
        };
      });
    });
  }

  async saveUser() {
    if (!this.userName || !this.userMail || !this.userPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Some fields are required' });
      console.error('Some fields are required');
      return;
    }

    const User = {
      username: this.userName,
      password: this.userPassword,
      mail: this.userMail,
      roles: ['user']
    };

    try {
      const response = await this.userService.createUser(User);
      console.log('User saved successfully:', response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
      window.location.reload();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error saving user' });
      console.error('Error saving user:', error);
    }
  }

  async onRowEditSave(user:any) {
    this.userService.updateUser(user).subscribe(
      (response) => {
        console.log('Ring updated successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user, please reload the page' });
        console.error('Error updating user:', error);
      }
    );
  }

  async onRowDelete(userid:any) {
    this.userService.deleteUser(userid).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting user, please reload the page' });
        console.error('Error deleting user:', error);
      }
    );
  }


}
