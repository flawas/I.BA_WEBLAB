import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import {TableDemo} from './uikit/tabledemo';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'table', component: TableDemo},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
