import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PostManagementComponent,
  PostListComponent,
  CreatePostComponent
} from 'src/app/post-management';

const routes: Routes = [
  {
    path: '',
    component: PostManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: PostListComponent
      },
      {
        path: 'create',
        component: CreatePostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
