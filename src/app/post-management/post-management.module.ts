import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from './api.service';
import { PostManagementComponent } from './post-management.component';
import {
  PostListComponent,
  CardComponent
} from 'src/app/post-management/post-list'
import { 
  ApiProviderService,
  TextShorterPipe
} from 'src/app/core';

@NgModule({
  declarations: [
    PostManagementComponent,
    TextShorterPipe,
    PostListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [ApiService,ApiProviderService]
})
export class PostManagementModule { }
