import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { AuthFinishComponent } from './auth-finish/auth-finish.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'jumbotron', pathMatch: 'full'},
  { path: 'jumbotron', component: JumbotronComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'authFinish', component: AuthFinishComponent},
  { path: 'table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
