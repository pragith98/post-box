import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserState } from 'src/app/user-management';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    public userState: UserState
  ) { }

  closeDialog() {
    this.dialogRef.close()
  }

  logout() {
    this.userState.userLogout()
    this.closeDialog();
  }
}
