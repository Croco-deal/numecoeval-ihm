import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline/timeline.component';
import { ResultComponent } from './components/timeline/result/result.component'
import { ReferentialComponent } from "./components/referential/referential.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: HistoryComponent },
  { path: '', component: TimelineComponent },
  { path: 'upload', component: TimelineComponent },
  { path: 'result"', component: ResultComponent },
  { path: 'result/:id"', component: ResultComponent },
  { path: 'referential-post', component: ReferentialComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
