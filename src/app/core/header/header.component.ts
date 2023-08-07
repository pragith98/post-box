import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from 'src/app/store';
import { 
  MatDialog, 
  MatDialogConfig
} from '@angular/material/dialog';
import { ViewUserComponent } from 'src/app/user';

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

  navigateToLogin(): void {
    this.router.navigate(['user','login']);
  }

  openViewUserDilog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    this.dialog.open(ViewUserComponent, dialogConfig);
  }
}
