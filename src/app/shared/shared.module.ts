import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterLinkWithHref} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref
    ],
  exports : [
    HeaderComponent
  ]
})
export class SharedModule { }
