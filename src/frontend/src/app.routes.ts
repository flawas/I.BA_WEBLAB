import {Routes} from '@angular/router';
import {AppLayout} from './app/layout/component/app.layout';
import {Dashboard} from './app/pages/dashboard/dashboard';
import {Landing} from './app/pages/landing/landing';
import {Notfound} from './app/pages/notfound/notfound';
import {InputTechnology} from './app/pages/input/inputTechnology';
import {InputCategory} from './app/pages/input/inputCategory';
import {InputRing} from './app/pages/input/inputRing';
import {LogView} from './app/pages/input/Log';
import {InputUsers} from './app/pages/input/inputUsers';

export const appRoutes: Routes = [
  {path: '', component: Landing},
  {
    path: 'dashboard',
    component: AppLayout,
    children: [
      {path: '', component: Dashboard},
      {path: 'pages', loadChildren: () => import('./app/pages/pages.routes')},
      {path: 'technologies', component: InputTechnology},
      {path: 'categories', component: InputCategory},
      {path: 'rings', component: InputRing},
      {path: 'logs', component: LogView},
      {path: 'users', component: InputUsers},
    ]
  },
  {path: 'notfound', component: Notfound},
  {path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes')},
  {path: '**', redirectTo: '/notfound'}
];
