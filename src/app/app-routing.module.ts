import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BetsComponent} from './bets/bets.component';
import {BetDetailComponent} from './bets/bet-detail/bet-detail.component';
import {BetEditComponent} from './bet-edit/bet-edit.component';
import {AuthComponent} from './auth/auth.component';
import {BetHomeComponent} from './bets/bet-home/bet-home.component';
import {SettingsComponent} from './settings/settings.component';
import {SettingsUsernameComponent} from './settings/settings-username/settings-username.component';
import {SettingsPasswordComponent} from './settings/settings-password/settings-password.component';
import {SettingsOtherComponent} from './settings/settings-other/settings-other.component';


const routes: Routes = [
  {path: '', redirectTo: '/bets', pathMatch: 'full'},
  {path: 'bets', component: BetsComponent, children: [
      {path: 'home', component: BetHomeComponent},
      {path: 'new', component: BetEditComponent},
      {path: ':id', component: BetDetailComponent},
      {path: ':id/edit', component: BetEditComponent}
    ]},
  {path: 'auth', component: AuthComponent },
  {path: 'settings', component: SettingsComponent, children: [
      {path: 'username', component: SettingsUsernameComponent},
      {path: 'password', component: SettingsPasswordComponent},
      {path: 'other', component: SettingsOtherComponent}
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
