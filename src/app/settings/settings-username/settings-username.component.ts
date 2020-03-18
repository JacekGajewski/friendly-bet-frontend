import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AccountSettingsService} from '../service/account-settings.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.css']
})
export class SettingsUsernameComponent implements OnInit {
  error: string = null;
  usernameForm: FormGroup;

  constructor(private accountService: AccountSettingsService) {
  }

  ngOnInit() {
    this.usernameForm = new FormGroup({
      new_username: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.accountService.changeUsername(this.usernameForm.get('new_username').value)
      .subscribe( responseDate => {
        console.log('ok');
        this.error = 'Nazwa użytkownika została zmieniona';
      }, error => {
        console.log(error);
        this.error = error.error.message;
      });
  }
}
