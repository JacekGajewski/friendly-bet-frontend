import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.css']
})
export class SettingsUsernameComponent implements OnInit {
  error: string = null;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(authForm: NgForm) {

  }
}
