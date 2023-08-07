import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { RouterModule } from "@angular/router";
import { 
    LoginFormComponent,
    ViewUserComponent
} from 'src/app/user/components';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
    declarations: [
        UserComponent,
        LoginFormComponent,
        ViewUserComponent
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
    providers: []
})
export class UserModule { }