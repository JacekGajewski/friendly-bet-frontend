import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AccountSettingsService} from '../service/account-settings.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.css']
})
export class SettingsPasswordComponent implements OnInit {
  error: string = null;
  success = false;
  passwordForm: FormGroup;


  constructor(private accountService: AccountSettingsService) {
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      current_password: new FormControl(null, Validators.required),
      new_pass: new FormGroup({
        new_password: new FormControl(null, Validators.required),
        repeat_password: new FormControl(null, Validators.required)
      })
    });
    this.passwordForm.get('new_pass').setValidators([Validators.required, this.matchingPasswords.bind(this)]);
    this.passwordForm.get('new_pass').updateValueAndValidity();
  }

  matchingPasswords(control: FormGroup): { [s: string]: boolean } {
    const new_password = this.passwordForm.get('new_pass').get('new_password');
    const repeat_password = this.passwordForm.get('new_pass').get('repeat_password');
    if (new_password.value === repeat_password.value) {
      return null;
    }
    return {passwordMatch: true};
  }


  onSubmit() {
    if (!this.passwordForm.valid) {
      return;
    }

    const oldPassword = this.passwordForm.get('current_password').value;
    const newPassword = this.passwordForm.get('new_pass').get('new_password').value;

    this.accountService.changePassword(oldPassword, newPassword).subscribe(responseData => {
      console.log('ok');
      this.error = 'Password changed successfully';
      this.success = true;
    }, error => {
      console.log(error);
      this.error = error.error.message;
      this.success = false;
    });
  }
}
