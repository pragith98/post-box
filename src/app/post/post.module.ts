import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TextShorterPipe } from 'src/app/core';
import { PostComponent } from './post.component';
import { 
  CreatePostComponent,
  DeletePostComponent,
  UpdatePostComponent,
  UpdatePostService,
  ViewPostComponent,
  ViewPostService,
  PostListComponent,
  CardComponent
} from 'src/app/post/components';


@NgModule({
  declarations: [
    PostComponent,
    TextShorterPipe,
    PostListComponent,
    CardComponent,
    CreatePostComponent,
    ViewPostComponent,
    UpdatePostComponent,
    DeletePostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule 
  ],
  providers: [
    ViewPostService,
    UpdatePostService
  ]
})
export class PostModule { }
