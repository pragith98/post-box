import { 
  Component, 
  Inject 
} from '@angular/core';
import { Post } from 'src/app/types';
import { PostState } from 'src/app/store'
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

  deletePost(): void {
    this.postState.deletePost(this.data.id)
      .subscribe(()=> this.dialogRef.close());
  }
}
