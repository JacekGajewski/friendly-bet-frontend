import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BetsListComponent} from './bets/bets-list/bets-list.component';
import {BetsComponent} from './bets/bets.component';
import {BetDetailComponent} from './bets/bet-detail/bet-detail.component';
import {BetEditComponent} from './bet-edit/bet-edit.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'bets', component: BetsComponent, children: [
      {path: 'new', component: BetEditComponent},
      {path: ':id', component: BetDetailComponent},
      {path: ':id/edit', component: BetEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
