import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NGXS_DATA_STORAGE_PLUGIN } from '@angular-ru/ngxs/storage';
import { 
  PostState,
  PostManagementModule
} from 'src/app/post-management';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';


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
      PostState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    PostManagementModule,
    HttpClientModule,
    NgxsDataPluginModule.forRoot([
      // NGXS_DATA_STORAGE_PLUGIN
    ]),
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
