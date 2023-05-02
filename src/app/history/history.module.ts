import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import {RouterLinkWithHref} from "@angular/router";



@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ],
  exports : [
    HistoryComponent
  ]
})
export class HistoryModule { }
