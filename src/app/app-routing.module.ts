import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { AuthFinishComponent } from './auth-finish/auth-finish.component';

const routes: Routes = [
  { path: '', redirectTo: 'jumbotron', pathMatch: 'full'},
  { path: 'dashboard', component: JumbotronComponent},
  { path: 'authFinish', component: AuthFinishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
