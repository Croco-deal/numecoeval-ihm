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


@NgModule({
  declarations: [AppComponent, ReferentialComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TimelineModule,
    HistoryModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
