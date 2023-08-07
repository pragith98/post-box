import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { ApiProviderService, HeaderComponent } from 'src/app/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NGXS_DATA_STORAGE_PLUGIN } from '@angular-ru/ngxs/storage'

import { PostModule } from 'src/app/post';
import { 
  PostState, 
  FormState 
} from 'src/app/store';
import { UserModule } from 'src/app/user';
import { UserState } from 'src/app/store'
import { PostApiService, UserApiService } from './apis';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      PostState,
      UserState,
      FormState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    PostModule,
    HttpClientModule,
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    MatToolbarModule,
    UserModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    UserApiService,
    PostApiService,
    ApiProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
