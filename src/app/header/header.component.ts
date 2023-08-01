import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from '../user-management/store.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewUserComponent } from '../user-management/view-user/view-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public userState: UserState,
    private dialog: MatDialog
  ) { }

  navigateToLogin() {
    this.router.navigate(['user','login']);
  }

  openViewUserDilog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    this.dialog.open(ViewUserComponent, dialogConfig);
  }
}
