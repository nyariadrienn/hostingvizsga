import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VoteComponent } from './components/vote/vote.component';


const routes: Routes = [
  {path: '', redirectTo: 'vote', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'vote', component: VoteComponent},
  {path: '**', redirectTo: 'vote', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
