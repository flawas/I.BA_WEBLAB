import {Component, OnInit} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputGroupModule} from 'primeng/inputgroup';
import {FluidModule} from 'primeng/fluid';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {FloatLabelModule} from 'primeng/floatlabel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {SliderModule} from 'primeng/slider';
import {RatingModule} from 'primeng/rating';
import {ColorPickerModule} from 'primeng/colorpicker';
import {KnobModule} from 'primeng/knob';
import {SelectModule} from 'primeng/select';
import {DatePickerModule} from 'primeng/datepicker';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {TreeSelectModule} from 'primeng/treeselect';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {TextareaModule} from 'primeng/textarea';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {NodeService} from '../service/node.service';
import {CategoryService} from '../service/category.service';
import {RingService} from '../service/ring.service';
import {TechnologyService} from '../service/technology.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

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
    TextareaModule, ToastModule, TableModule, Tag
  ],
  template: `
    <p-toast></p-toast>
    <p-fluid class="flex flex-col ms-auto gap-8">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Create technology</div>


        <div class="flex flex-row gap-4 w-full">

          <div class="flex flex-col gap-4 w-1/2 min-w-3.5">
            <p-floatlabel variant="on">
              <p-select [(ngModel)]="dropdownValueCategory" [options]="dropdownValuesCategories" optionLabel="name"
                        id="category"
                        [ngClass]="{'ng-invalid ng-dirty': !dropdownValueCategory && dropdownValueCategory !== ''}"/>
              <label for="category">Category of technology</label>
            </p-floatlabel>
          </div>
          <div class="flex flex-col gap-4 w-1/2 max-">
            <p-floatlabel variant="on">
              <p-select [(ngModel)]="dropdownValueRing" [options]="dropdownValuesRings" optionLabel="name" id="ring"/>
              <label for="ring">Ring of technology</label>
            </p-floatlabel>
          </div>
        </div>

        <p-floatlabel variant="on">
          <input pInputText id="technologyName" [(ngModel)]="technologyName"
                 [ngClass]="{'ng-invalid ng-dirty': !technologyName && technologyName !== ''}"/>
          <label for="technologyName">Name of technology</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <textarea pTextarea id="technologyDescription" [(ngModel)]="descriptionOfTechnology" rows="5" cols="30"
                    style="resize: none" class="h-full"></textarea>
          <label for="technologyDescription">Description of technology</label>
        </p-floatlabel>

        <p-floatlabel variant="on">
          <textarea pTextarea id="technologyClassDescription" [(ngModel)]="descriptionOfClassification" rows="5"
                    cols="30" style="resize: none" class="h-full"></textarea>
          <label for="technologyClassDescription">Description of the classification</label>
        </p-floatlabel>

        <p-togglebutton [(ngModel)]="publishedValue" onLabel="Published" offLabel="Draft" onIcon="pi pi-eye"
                        offIcon="pi pi-eye-slash" styleClass="w-36"
                        [disabled]="!descriptionOfClassification || !dropdownValueRing"/>

        <p-button
          [label]="technologyName && dropdownValueCategory && dropdownValueRing && descriptionOfClassification && publishedValue? 'Save New Technology' : 'Save Draft'"
          icon="pi pi-check" [loading]="loading" (onClick)="saveTechnology()"
          [disabled]="!technologyName || !dropdownValueCategory"/>

      </div>

    </p-fluid>
  `,
  providers: [NodeService, CategoryService, MessageService, DatePipe]
})
export class InputTechnology implements OnInit {

  technologies!: any[];

  dropdownValuesCategories: any[] = [];
  dropdownValuesRings: any[] = [];

  dropdownValueCategory: any = null;
  dropdownValueRing: any = null;

  technologyName: string = '';

  descriptionOfTechnology: string = '';
  descriptionOfClassification: string = '';

  loading: boolean = false;

  publishedValue: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private ringService: RingService,
    private technologyService: TechnologyService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
  }


  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dropdownValuesCategories = categories.map((category: any) => {
        return {
          id: category._id,
          name: category.name
        };
      });
    });


    this.ringService.getRings().subscribe((rings) => {
      this.dropdownValuesRings = rings.map((ring: any) => {
        return {
          id: ring._id,
          name: ring.name
        };
      });
    });

    this.technologyService.getTechnologies().subscribe((data) => {
      const categoryObservables = data.map((tech: { fk_category: string; }) =>
        this.categoryService.getCategory(tech.fk_category).pipe(map((category: { name: string; }) => category.name))
      );

      const ringObservables = data.map((tech: { fk_ring: string; }) =>
        this.ringService.getRing(tech.fk_ring).pipe(map((ring: { name: string; }) => ring.name))
      );

      forkJoin([forkJoin(categoryObservables), forkJoin(ringObservables)]).subscribe(([categoryNames, ringNames]) => {
        this.technologies = data.map((tech: { creationDate: string | number | Date; lastUpdate: string | number | Date; }, index: number) => {
          const categoryName = (categoryNames as string[])[index];
          const ringName = (ringNames as string[])[index];
          return {
            ...tech,
            creationDate: this.datePipe.transform(tech.creationDate, 'dd.MM.yyyy HH:mm'),
            lastUpdate: this.datePipe.transform(tech.lastUpdate, 'dd.MM.yyyy HH:mm'),
            fk_category_name: categoryName,
            fk_ring_name: ringName
          };
        });
      });
    });
  }

  async saveTechnology() {
    if (!this.technologyName || !this.dropdownValueCategory || !this.descriptionOfClassification) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Some fields are required'});
      console.error('Some fields are required')
      return;
    }

    const technology = {
      name: '',
      fk_ring: '',
      fk_category: '',
      description: '',
      description_categorisation: '',
      published: false
    };

    console.log(this.dropdownValuesCategories);
    console.log('Technology name:', this.technologyName);
    console.log('Technology description:', this.descriptionOfTechnology);
    console.log('Technology classification description:', this.descriptionOfClassification);

    const selectedRing = this.dropdownValuesRings.find(
      (ring) => ring.name === this.dropdownValueRing?.name
    );

    const selectedCategory = this.dropdownValuesCategories.find(
      (category) => category.name === this.dropdownValueCategory.name
    );

    if (!selectedCategory) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Selected category is not valid'});
      console.error('Selected category is not valid');
      return;
    }

    technology.name = this.technologyName;
    technology.fk_ring = selectedRing ? selectedRing.id : '';
    technology.fk_category = selectedCategory.id;
    technology.description = this.descriptionOfTechnology;
    technology.description_categorisation = this.descriptionOfClassification;
    technology.published = this.publishedValue;

    this.technologyService.postTechnology(technology).subscribe(
      (response) => {
        console.log('Technology saved successfully:', response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Technology created successfully'});
        window.location.reload();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error saving technology'});
        console.error('Error saving technology:', error);
      }
    );
  }


  async updateTechnology() {



  }

  getSeverity(published: boolean): 'success' | 'warn' {
    return published ? 'success' : 'warn';
  }
}
