import { Component, Inject } from '@angular/core';
import { PostState } from '../store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../post.model';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  constructor(
    private dialogRef: MatDialogRef<DeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Post,
    private postState: PostState
  ) { }

  deletePost() {
    this.postState.deletePost(this.data.id)
      .subscribe(()=> this.dialogRef.close());
  }
}
