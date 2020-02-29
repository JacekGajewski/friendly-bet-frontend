import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-other',
  templateUrl: './settings-other.component.html',
  styleUrls: ['./settings-other.component.css']
})
export class SettingsOtherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete() {
    if (confirm('Are you sure you want to pernamently delete your account?')) {
      confirm('YOU SUCK!');
    }
  }
}
