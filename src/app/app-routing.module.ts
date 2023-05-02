import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component'
import { TimelineComponent } from './timeline/timeline/timeline.component';
import { ResultComponent } from './timeline/result/result.component'

const routes: Routes = [
  { path: '', component: HistoryComponent },
  { path: 'upload', component: TimelineComponent },
  { path: 'result"', component: ResultComponent },
  { path: 'result/:id"', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
