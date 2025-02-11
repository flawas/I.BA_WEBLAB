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

@Component({
  standalone: true,
  selector: 'app-recent-sales-widget',
  imports: [CommonModule, TableModule, ButtonModule, RippleModule, TagModule],
  template: `<div class="card !mb-8">
    <div class="font-semibold text-xl mb-4">New Technologies</div>
    <p-table [value]="technologies" [paginator]="true" [rows]="5" responsiveLayout="scroll">
      <ng-template #header>
        <tr>
          <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
          <th pSortableColumn="published">Published <p-sortIcon field="published"></p-sortIcon></th>
          <th pSortableColumn="categoryName">Category <p-sortIcon field="categoryName"></p-sortIcon></th>
          <th pSortableColumn="creationDate">Creation date <p-sortIcon field="creationDate"></p-sortIcon></th>
          <th pSortableColumn="lastUpdate">Last update <p-sortIcon field="lastUpdate"></p-sortIcon></th>
          <th>View</th>
        </tr>
      </ng-template>
      <ng-template #body let-technology>
        <tr>
          <td style="width: 35%; min-width: 7rem;">{{ technology.name }}</td>
          <td style="width: 25%; min-width: 5rem;">
            <p-tag [value]="technology.published ? 'Published' : 'Draft'" [severity]="getSeverity(technology.published)"></p-tag>
          </td>
          <td style="width: 25%; min-width: 8rem;">{{ technology.categoryName }}</td>
          <td style="width: 40%; min-width: 10rem;">{{ technology.creationDate }}</td>
          <td style="width: 40%; min-width: 10rem;">{{ technology.lastUpdate }}</td>
          <td style="width: 15%;">
            <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  </div>`,
  providers: [TechnologyService, CategoryService, DatePipe]
})
export class TechnologiesWidget implements OnInit {
  technologies!: any[];

  constructor(
    private technologyService: TechnologyService,
    private datePipe: DatePipe,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.technologyService.getTechnologies().subscribe((data) => {
      const categoryObservables = data.map((tech: { fk_category: string; }) =>
        this.categoryService.getCategory(tech.fk_category).pipe(map((category: { name: string; }) => category.name))
      );

      forkJoin<string[]>(categoryObservables).subscribe((categoryNames) => {
        this.technologies = data.map((tech: { creationDate: string | number | Date; lastUpdate: string | number | Date; }, index: number) => {
          const categoryName = categoryNames[index];
          return {
            ...tech,
            creationDate: this.datePipe.transform(tech.creationDate, 'dd.MM.yyyy hh:mm'),
            lastUpdate: this.datePipe.transform(tech.lastUpdate, 'dd.MM.yyyy hh:mm'),
            categoryName: categoryName
          };
        });
      });
    });
  }

  getSeverity(published: boolean): 'success' | 'warn' {
    return published ? 'success' : 'warn';
  }
}
