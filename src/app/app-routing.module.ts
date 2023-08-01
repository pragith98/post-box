import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {
  PostManagementComponent,
  PostListComponent,
  CreatePostComponent,
  ViewPostComponent,
  UpdatePostComponent
} from 'src/app/post-management';
import { 
  UserManagementComponent,
  LoginFormComponent
} from 'src/app/user-management';

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
        component: CreatePostComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id/view',
        component: ViewPostComponent
      },
      {
        path: ':id/update',
        component: UpdatePostComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'user', 
    component:UserManagementComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
