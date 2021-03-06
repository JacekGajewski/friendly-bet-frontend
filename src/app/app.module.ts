import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EnvServiceProvider } from './env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BetsListComponent } from './bets/bets-list/bets-list.component';
import { BetsComponent } from './bets/bets.component';
import { BetItemComponent } from './bets/bets-list/bet-item/bet-item.component';
import { BetDetailComponent } from './bets/bet-detail/bet-detail.component';
import { BetEditComponent } from './bet-edit/bet-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { BetHomeComponent } from './bets/bet-home/bet-home.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { SettingsPasswordComponent } from './settings/settings-password/settings-password.component';
import { SettingsOtherComponent } from './settings/settings-other/settings-other.component';
import { SettingsUsernameComponent } from './settings/settings-username/settings-username.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BetsListComponent,
    BetsComponent,
    BetItemComponent,
    BetDetailComponent,
    BetEditComponent,
    AuthComponent,
    BetHomeComponent,
    SettingsComponent,
    SettingsListComponent,
    SettingsPasswordComponent,
    SettingsOtherComponent,
    SettingsUsernameComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
