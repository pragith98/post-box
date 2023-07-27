import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  PostManagementComponent,
  PostListComponent
} from 'src/app/post-management';

const routes: Routes = [
  { path: '', 
    component: PostManagementComponent, 
    children: [
      { 
        path:'', 
        redirectTo:'list', 
        pathMatch: 'full' 
      },
      { 
        path:'list', 
        component: PostListComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
