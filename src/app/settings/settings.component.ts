import { Component, OnInit } from '@angular/core';
import {BetService} from '../bets/service/bet.service';
import {AccountSettingsService} from './service/account-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AccountSettingsService]
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
