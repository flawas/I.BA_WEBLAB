import { Component, OnInit } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TechnologyService } from '../../service/technology.service';
import { CategoryService } from '../../service/category.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RingService } from '../../service/ring.service';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectModule } from 'primeng/select';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-technologies-overview',
  imports: [CommonModule, TableModule, ButtonModule, RippleModule, TagModule, Dialog, InputText, ReactiveFormsModule, Textarea, FormsModule, ToggleButtonModule, SelectModule, Toast],
  template: `
    <p-toast></p-toast>
    <div class="card !mb-8">
    <div class="font-semibold text-xl mb-4">Technologies</div>
    <div *ngFor="let category of categories">
      <div class="font-semibold text-xl mb-4">{{ category.name }}</div>

      <ng-container *ngIf="!technologies || technologies.length === 0">
        <p>No technologies found.</p>
      </ng-container>

      <p-table [value]="technologies" [paginator]="true" [rows]="13" responsiveLayout="scroll" sortMode="single" [multiSortMeta]="[{field: 'fk_ring_level', order: -1}, {field: 'published', order: -1}]">
        <ng-template #header>
          <tr>
            <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th pSortableColumn="published">Visibility <p-sortIcon field="published"></p-sortIcon></th>
            <th>Ring </th>
            <th pSortableColumn="fk_ring_level">Ring level <p-sortIcon field="fk_ring_level"></p-sortIcon></th>
            <th pSortableColumn="creationDate">Creation date <p-sortIcon field="creationDate"></p-sortIcon></th>
            <th pSortableColumn="lastUpdate">Last update <p-sortIcon field="lastUpdate"></p-sortIcon></th>
            <th>View</th>
          </tr>
        </ng-template>
        <ng-template #body let-technology>
          <tr *ngIf="technology.fk_category === category._id">
            <td style="width: 35%; min-width: 7rem;">{{ technology.name }}</td>
            <td style="width: 25%; min-width: 5rem;">
              <p-tag [value]="technology.published ? 'Published' : 'Draft'" [severity]="getSeverity(technology.published)"></p-tag>
            </td>
            <td style="width: 25%; min-width: 8rem;">{{ technology.fk_ring_name }}</td>
            <td style="width: 5%; min-width: 5rem;">{{ technology.fk_ring_level }}</td>
            <td style="width: 40%; min-width: 10rem;">{{ technology.creationDate }}</td>
            <td style="width: 40%; min-width: 10rem;">{{ technology.lastUpdate }}</td>
            <td style="width: 15%;">
              <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only" (click)="technology.visible = true"></button>
            </td>
            <!-- popup dialog -->
            <p-dialog header="{{ technology.name }}" [(visible)]="technology.visible" [modal]="true" [breakpoints]="{ '199px': '75vw', '575px': '90vw' }" [style]="{ width: '75vw' }" [draggable]="false" [resizable]="false">
              <div class="flex items-center gap-4 mb-8">
                <label for="technologyName" class="font-semibold w-24">Name</label>
                <input pInputText id="technologyName" class="flex-auto" autocomplete="off" [value]="technology.name" [(ngModel)]="technology.name"/>
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="published" class="font-semibold w-24">Visibility</label>
                <p-togglebutton [(ngModel)]="technology.published" onLabel="Published" offLabel="Draft" onIcon="pi pi-eye" offIcon="pi pi-eye-slash" styleClass="w-36"  [disabled]="!technology.description_categorisation || !technology.fk_ring"/>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="description" class="font-semibold w-24">Description</label>
                <textarea pTextarea id="description" class="flex-auto" [(ngModel)]="technology.description" autocomplete="off" [value]="technology.description" ></textarea>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="categoryName" class="font-semibold w-24">Category </label>
                <p-select [options]="categories" [(ngModel)]="technology.fk_category_name" optionLabel="name" optionValue="name" placeholder="Select a category" class="w-full md:w-56" (ngModelChange)="onCategoryChange($event, technology)" />              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="categoryDescription" class="font-semibold w-24">Category description</label>
                <textarea pTextarea id="categoryDescription" class="flex-auto" autocomplete="off" [(ngModel)]="technology.description_categorisation" [value]="technology.description_categorisation"></textarea>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="ringName" class="font-semibold w-24">Ring</label>
                <p-select [options]="rings" [(ngModel)]="technology.fk_ring_name" optionLabel="name" optionValue="name" placeholder="Select a ring" class="w-full md:w-56" (ngModelChange)="onRingChange($event, technology)" />              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="ringLevel" class="font-semibold w-24">Ring level</label>
                <input pInputText id="ringLevel" class="flex-auto" autocomplete="off" [value]="technology.fk_ring_level" [disabled]="true"/>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="creationDate" class="font-semibold w-24">Created at</label>
                <input pInputText id="creationDate" class="flex-auto" autocomplete="off" [value]="technology.creationDate" [disabled]="true"/>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="lastUpdate" class="font-semibold w-24">Last updated</label>
                <input pInputText id="lastUpdate" class="flex-auto" autocomplete="off" [value]="technology.lastUpdate" [disabled]="true"/>
              </div>

              <div class="flex justify-end gap-2">
                <p-button label="Cancel" severity="secondary" (click)="technology.visible = false" />
                <p-button label="Save" (click)="saveTechnology(technology)" [disabled]="!technology.name || !technology.description || !technology.fk_category" />
              </div>
            </p-dialog>
          </tr>
        </ng-template>
      </p-table>
    </div>
  </div>`,
  providers: [TechnologyService, CategoryService, DatePipe, MessageService]
})
export class TechnologiesWidget implements OnInit {
  technologies!: any[];
  categories: any[] = [];
  rings: any[] = [];

  constructor(
    private technologyService: TechnologyService,
    private datePipe: DatePipe,
    private categoryService: CategoryService,
    private ringService: RingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => { this.categories = data; });

    this.ringService.getRings().subscribe((data) => { this.rings = data; });

    this.technologyService.getTechnologies().subscribe((data) => {
      const categoryObservables = data.map((tech: { fk_category: string; }) =>
        this.categoryService.getCategory(tech.fk_category).pipe(map((category: { _id: string; name: string; }) => category))
      );

      const ringObservables = data.map((tech: { fk_ring: string; }) =>
        this.ringService.getRing(tech.fk_ring).pipe(map((ring: { _id: string; name: string; }) => ring))
      );

      forkJoin([forkJoin(categoryObservables), forkJoin(ringObservables)]).subscribe(([categories, rings]) => {
        this.technologies = data.map((tech: { creationDate: string | number | Date; lastUpdate: string | number | Date; }, index: number) => {
          const category = (categories as { _id: string; name: string; }[])[index];
          const ring = (rings as { _id: string; name: string; }[])[index];
          return {
            ...tech,
            creationDate: this.datePipe.transform(tech.creationDate, 'dd.MM.yyyy HH:mm'),
            lastUpdate: this.datePipe.transform(tech.lastUpdate, 'dd.MM.yyyy HH:mm'),
            fk_category_name: category.name,
            fk_ring_name: ring.name,
            fk_ring_level: this.rings.find((r) => r.name === ring.name)?.level,
            visible: false
          };
        });
      });
    });
  }

  onRingChange(selectedRingName: string, technology: any) {
    const selectedRing = this.rings.find(ring => ring.name === selectedRingName);
    if (selectedRing) {
      technology.fk_ring = selectedRing._id;
    }
    console.log(technology);
  }

  onCategoryChange(selectedCategoryName: string, technology: any) {
    const selectedCategory = this.categories.find(category => category.name === selectedCategoryName);
    if (selectedCategory) {
      technology.fk_category = selectedCategory._id;
    }
  }

  getSeverity(published: boolean): 'success' | 'warn' {
    return published ? 'success' : 'warn';
  }

  async saveTechnology(technology: any) {
    this.technologyService.updateTechnology(technology).subscribe(
      (response) => {
        technology.visible = false;
        console.log('Technology updated successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Technology updated successfully' });
        window.location.reload();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting technology, please reload the page' });
        console.error('Error updating technology:', error);
      }
    );
  }

  protected readonly console = console;
}
