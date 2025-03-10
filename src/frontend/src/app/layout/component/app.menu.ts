import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
              label: 'Inputs',
              items: [
                { label: 'Technologies', icon: 'pi pi-fw pi-microchip-ai', routerLink: ['/dashboard/technologies'] },
                { label: 'Rings', icon: 'pi pi-fw pi-spinner', routerLink: ['/dashboard/rings'] },
                { label: 'Categories', icon: 'pi pi-fw pi-bars', routerLink: ['/dashboard/categories'] },
                { label: 'Logs', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/dashboard/logs'] },
                { label: 'Users', icon: 'pi pi-fw pi-user', class: 'rotated-icon', routerLink: ['/dashboard/users'] },
              ]
            }
        ];
    }
}
