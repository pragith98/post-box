import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PostManagementComponent,
  PostListComponent,
  CreatePostComponent,
  ViewPostComponent
} from 'src/app/post-management';
import { UpdatePostComponent } from './post-management/update-post/update-post.component';

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
      },
      {
        path: ':id/view',
        component: ViewPostComponent
      },
      {
        path: ':id/update',
        component: UpdatePostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
