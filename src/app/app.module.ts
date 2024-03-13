import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { HistoryModule } from './components/history/history.module';
import { ReferentialComponent } from './components/referential/referential.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {NgxUiLoaderModule} from "ngx-ui-loader";
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [AppComponent, ReferentialComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TimelineModule,
    HistoryModule,
    HttpClientModule,
    AgGridModule,NgxUiLoaderModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
