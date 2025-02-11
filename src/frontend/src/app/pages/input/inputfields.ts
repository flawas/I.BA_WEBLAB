import { Component, inject, OnInit } from '@angular/core';
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
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
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
import { CountryService } from '../service/country.service';
import { NodeService } from '../service/node.service';
import { TreeNode } from 'primeng/api';
import { Country } from '../service/customer.service';
import {CategoryService} from '../service/category.service';
import {map} from 'rxjs/operators';
import {RingService} from '../service/ring.service';

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
    TextareaModule
  ],
  template: `
    <p-fluid class="flex flex-col ms-auto gap-8">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Create technology</div>

        <div class="font-semibold text-xl">Category</div>
        <p-select [(ngModel)]="dropdownValueCategory" [options]="dropdownValuesCategories" optionLabel="name"
                  placeholder="Select"/>

        <div class="font-semibold text-xl">Ring</div>
        <p-select [(ngModel)]="dropdownValueRings" [options]="dropdownValuesRings" optionLabel="name"
                  placeholder="Select"/>
      </div>
    </p-fluid>`,
  providers: [CountryService, NodeService, CategoryService]
})
export class InputFields implements OnInit{

  dropdownValuesCategories: any[] = [];
  dropdownValuesRings: any[] = [];

  dropdownValueCategory: any = null;
  dropdownValueRings: any = null;

  constructor(
    private categoryService: CategoryService,
    private ringService: RingService
  ) { }


  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dropdownValuesCategories = categories.map((category: any) => {
        console.log('Category name:', category.name);
        return {
          id: category.id,
          name: category.name
        };
      });
    });

    this.ringService.getRings().subscribe((rings) => {
      this.dropdownValuesRings = rings.map((ring: any) => {
        console.log('Ring name:', ring.name);
        return {
          id: ring.id,
          name: ring.name
        };
      });
    });
  }

}
