import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserModule } from '@angular/platform-browser';
import { ResultComponent } from './result/result.component'
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {FormsModule} from "@angular/forms";


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
        BrowserModule,
        NgxUiLoaderModule,
        FormsModule
    ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
