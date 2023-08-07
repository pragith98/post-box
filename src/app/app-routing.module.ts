import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {
  PostComponent,
  PostListComponent,
  CreatePostComponent,
  ViewPostComponent,
  UpdatePostComponent
} from 'src/app/post';
import { 
  UserComponent,
  LoginFormComponent
} from 'src/app/user';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
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
    component:UserComponent,
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
