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
import {CategoryService} from '../service/category.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
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
        <div class="font-semibold text-xl">Create category</div>

        <p-floatlabel variant="on">
          <input pInputText id="categoryName" [(ngModel)]="categoryName"/>
          <label for="categoryName">Name of category</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <textarea pTextarea id="categoryDescription" [(ngModel)]="categoryDescription" rows="5" cols="30"
                    style="resize: none" class="h-full"></textarea>
          <label for="categoryDescription">Description of technology</label>
        </p-floatlabel>

        <p-button
          label="Save new category"
          icon="pi pi-check" (onClick)="saveCategory()" [disabled]="!categoryName || !categoryDescription"/>
      </div>
      <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Categories</div>
        <p-table [value]="categories" dataKey="id" editMode="row" [paginator]="true" [rows]="5"
                 responsiveLayout="scroll">
          <ng-template #header>
            <tr>
              <th pSortableColumn="name">Name
                <p-sortIcon field="name"></p-sortIcon>
              </th>
              <th pSortableColumn="published">Description
                <p-sortIcon field="published"></p-sortIcon>
              </th>
              <th style="width:20%"></th>
            </tr>
          </ng-template>
          <ng-template #body let-category let-editing="editing" let-ri="rowIndex">
            <tr [pEditableRow]="category">
              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="category.name"/>
                  </ng-template>
                  <ng-template #output>
                    {{ category.name }}
                  </ng-template>
                </p-cellEditor>
              </td>

              <td>
                <p-cellEditor>
                  <ng-template #input>
                    <input
                      pInputText
                      type="text"
                      [(ngModel)]="category.description"/>
                  </ng-template>
                  <ng-template #output>
                    {{ category.description }}
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
                    (click)="onRowDelete(category.id)"
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
                    (click)="onRowEditSave(category)"
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
  providers: [NodeService, CategoryService, MessageService]
})
export class InputCategory implements OnInit{

  categories!: any[];

  categoryDescription: string = '';
  categoryName: string = '';

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private userService: UserService
  ) { }


  async ngOnInit() {
    await this.userService.isLoggedIn();
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.map((category: any) => {
        return {
          id: category._id,
          name: category.name,
          description: category.description
        };
      });
    });
  }


  async saveCategory() {
    if (!this.categoryName || !this.categoryDescription) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Some fields are required' });
      console.error('Some fields are required');
      return;
    }

    const category = {
      name: this.categoryName,
      description: this.categoryDescription
    };

    this.categoryService.postCategory(category).subscribe(
      (response) => {
        console.log('Technology saved successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Technology created successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error saving technology' });
        console.error('Error saving technology:', error);
      }
    );
  }

  async onRowEditSave(category:any) {
    this.categoryService.updateCategory(category).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating category' });
        console.error('Error updating category:', error);
      }
    );
  }

  async onRowDelete(categoryId:any) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting category' });
        console.error('Error deleting category:', error);
      }
    );
  }
}
