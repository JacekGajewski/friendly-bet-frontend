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
  success = false;
  username: string;
  usernameForm: FormGroup;

  constructor(private accountService: AccountSettingsService, private userAuth: AuthService) {
  }

  ngOnInit() {
    this.usernameForm = new FormGroup({
      new_username: new FormControl(null, Validators.required)
    });
    this.username = this.userAuth.user.username;
  }

  onSubmit() {
    this.accountService.changeUsername(this.usernameForm.get('new_username').value)
      .subscribe( responseDate => {
        console.log('ok');
        this.error = 'Username changed successfully';
        this.success = true;
        this.userAuth.user.username = this.usernameForm.get('new_username').value;
        this.username = this.usernameForm.get('new_username').value;
        this.usernameForm.get('new_username').reset();
      }, error => {
        console.log(error);
        this.error = error.error.message;
        this.success = false;
      });
  }
}
