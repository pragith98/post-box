import { 
  Component, 
  Inject 
} from '@angular/core';
import { 
  PostState,
  Post 
} from 'src/app/post-management';
import { 
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

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
