import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { GoogleAuthComponent } from './googleAuth/google-auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'jumbotron', pathMatch: 'full'},
  { path: 'dashboard', component: JumbotronComponent},
  { path: 'gAuth', component: GoogleAuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
