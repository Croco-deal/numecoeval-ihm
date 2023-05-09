import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline/timeline.component';
import { ResultComponent } from './timeline/result/result.component'
import {ReferencialComponent} from "./referencial/referencial.component";

const routes: Routes = [
  // { path: '', component: HistoryComponent },
  { path: '', component: TimelineComponent },
  { path: 'upload', component: TimelineComponent },
  { path: 'result"', component: ResultComponent },
  { path: 'result/:id"', component: ResultComponent },
  { path: 'referencial', component: ReferencialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
