import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResultComponent } from './result/result.component'


@NgModule({
  declarations: [
    TimelineComponent,
    ResultComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
