import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      panelClass: ['success-snackbar']
    })
  }

  false(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      panelClass: ['false-snackbar']
    })
  }
}
