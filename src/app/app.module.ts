import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { HistoryModule } from './components/history/history.module';
import { ReferentialComponent } from './components/referential/referential.component';
import { ReferentialListComponent } from './components/referential-list/referential-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ReferentialComponent,
    ReferentialListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TimelineModule,
    HistoryModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
