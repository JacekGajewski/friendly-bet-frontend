import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.css']
})
export class SettingsPasswordComponent implements OnInit {
  error: string = null;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(authForm: NgForm) {

  }
}
