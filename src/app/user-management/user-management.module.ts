import { NgModule } from "@angular/core";
import { UserManagementComponent } from "./user-management.component";
import { RouterModule } from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiService } from "./api.service";
import { ApiProviderService } from "../core";
import { UserState } from "./store.service";
import { ViewUserComponent } from './view-user/view-user.component';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
    declarations: [
        UserManagementComponent,
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
    providers: [
        ApiService,
        ApiProviderService,
        UserState
    ]
})
export class UserManagementModule { }