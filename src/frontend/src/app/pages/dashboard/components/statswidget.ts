import {Component, ElementRef, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TechnologyService} from '../../service/technology.service';
import {CategoryService} from '../../service/category.service';
import {RingService} from '../../service/ring.service';
import {UserService} from '../../service/user.service';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Technologies</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl" id="techcountPublished"></div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-microchip-ai text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium" id="techcountDraft"></span>
                <span class="text-muted-color"> technologies in draft</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Categories</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl" id="categoriesPublished"></div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bars text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
          <div class="card mb-0">
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-muted-color font-medium mb-4">Rings</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl" id="ringsPublished"></div>
              </div>
              <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                <i class="pi pi-spinner text-purple-500 !text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Users</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl" id="usersPublished"></div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        `
})
export class StatsWidget {

  constructor(
    private techService: TechnologyService,
    private categoryService: CategoryService,
    private ringService: RingService,
    private renderer: Renderer2,
    private el: ElementRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.techService.getTechnolgiesCountPublished().subscribe((count) => {
      const techCountElement = this.el.nativeElement.querySelector('#techcountPublished');
      this.renderer.setProperty(techCountElement, 'innerText', count + " Technologies");
    });

    this.techService.getTechnolgiesCountDraft().subscribe((count) => {
      const techCountElement = this.el.nativeElement.querySelector('#techcountDraft');
      this.renderer.setProperty(techCountElement, 'innerText', count);
    });

    this.categoryService.getCategoriesCount().subscribe((count) => {
      const categoriesCountElement = this.el.nativeElement.querySelector('#categoriesPublished');
      this.renderer.setProperty(categoriesCountElement, 'innerText', count + " Categories");
    });

    this.ringService.getRingCount().subscribe((count) => {
      const ringsCountElement = this.el.nativeElement.querySelector('#ringsPublished');
      this.renderer.setProperty(ringsCountElement, 'innerText', count + " Rings");
    });

    this.userService.getAll().subscribe((users) => {
      const userCount = users.length;
      const usersCountElement = this.el.nativeElement.querySelector('#usersPublished');
      this.renderer.setProperty(usersCountElement, 'innerText', userCount + " Users");
    });

  }

}
